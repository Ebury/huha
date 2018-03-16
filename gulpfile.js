const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const runSequence = require('run-sequence');
const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const packageJson = require('./package.json');

const $ = gulpLoadPlugins();

const VERSION = packageJson.version;
const versionedBuildFolder = `dist/${VERSION}`;
const devBuildFolder = 'dist/dev';

function lint(files, options) {
  return gulp.src(files)
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
}

gulp.task('lint', () => {
  return lint('src/**/*.js', {
    fix: true
  })
  .pipe(gulp.dest('src'));
});

gulp.task('build', ['lint'], () => {
  const b = browserify({
    debug: true
  });
  b.add('src/huha.js');
  b.transform(babelify);
  return b.bundle()
    .pipe(source('huha.js'))
    .pipe($.plumber())
    .pipe(buffer())
    .pipe($.uglify())
    .pipe($.size({title: 'build', gzip: true}))
    .pipe(gulp.dest(versionedBuildFolder))
    .pipe(gulp.dest(devBuildFolder));
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('default', done => {
  runSequence('clean', 'build', done);
});

gulp.task('deploy', ['default'], () => {
  const publisher = $.awspublish.create({
    'params': {
      'Bucket': process.env.HUHA_S3_BUCKET
    },
    'accessKeyId': process.env.HUHA_S3_ACCESS_KEY_ID,
    'secretAccessKey': process.env.HUHA_S3_SECRET_ACCESS_KEY,
  });

  const headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('dist/**/*.*')
    .pipe(publisher.publish(headers))
    .pipe($.awspublish.reporter());
});
