const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const runSequence = require('run-sequence');
const packageJson = require('./package.json');

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
  return gulp.src('src/huha.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.uglify())
    .pipe($.sourcemaps.write('.'))
    .pipe($.size({ title: 'build', gzip: true }))
    .pipe(gulp.dest(buildFolder))
    .pipe(gulp.dest(versionedBuildFolder))
    .pipe(gulp.dest(devBuildFolder));
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('default', (done) => {
  runSequence('clean', 'build', done);
});
