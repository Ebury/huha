const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const runSequence = require('run-sequence');
const packageJson = require('./package.json');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const $ = gulpLoadPlugins();

const VERSION = packageJson.version;
const buildFolder = 'dist';
const versionedBuildFolder = `${buildFolder}/${VERSION}`;
const devBuildFolder = `${buildFolder}/dev`;

function lint(files, options) {
  return gulp.src(files)
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
}

gulp.task('lint', () => {
  const l = lint('src/**/*.js', {
    fix: true,
  })
    .pipe(gulp.dest('src'));
  return l;
});

gulp.task('build', () => {
  const b = browserify({
    entries: 'src/huha.js',
    debug: true,
    transform: babelify,
    standalone: 'Huha',
  });

  return b.bundle()
    .pipe(source('huha.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('./'))
    .pipe($.size({ title: 'build', gzip: true }))
    .pipe(gulp.dest(buildFolder))
    .pipe(gulp.dest(versionedBuildFolder))
    .pipe(gulp.dest(devBuildFolder));
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('default', (done) => {
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