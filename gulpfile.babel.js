import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

const { src, dest, series } = require('gulp');

const $ = gulpLoadPlugins();

const buildFolder = 'dist';

const clean = () => del(['dist']);

const lint = () => src('src/**/*.js')
  .pipe($.eslint({
    fix: true,
  }))
  .pipe($.eslint.format())
  .pipe($.eslint.failAfterError())
  .pipe(dest('src'));

const build = () => {
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
    .pipe(dest(buildFolder));
};

gulp.task('lint', lint);
gulp.task('build', series(clean, build));
gulp.task('default', series(clean, build));
