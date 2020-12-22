import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import packageJson from './package.json';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

const { src, dest, series } = require('gulp');

const $ = gulpLoadPlugins();

const VERSION = packageJson.version;
const buildFolder = 'dist';
const versionedBuildFolder = `${buildFolder}/${VERSION}`;
const devBuildFolder = `${buildFolder}/dev`;

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
    .pipe(dest(buildFolder))
    .pipe(dest(versionedBuildFolder))
    .pipe(dest(devBuildFolder));
};

const deploy = () => {
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

  return src('dist/**/*.*')
    .pipe(publisher.publish(headers))
    .pipe($.awspublish.reporter());
};

gulp.task('lint', lint);
gulp.task('deploy', series(clean, build, deploy));
gulp.task('build', series(clean, build));
gulp.task('default', series(clean, build));
