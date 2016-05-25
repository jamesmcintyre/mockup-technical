'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rimraf = require('rimraf');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');


var config = {
  paths: {
    js: './src/js/**/*.js',
    sass: './src/styles/**/*.scss',
    html: './src/**/*.html',
    img: './src/imgs/*'
  }
};

gulp.task('clean-js', function(cb) {
  rimraf('./public/js', cb);
});
gulp.task('clean-css', function(cb) {
  rimraf('./public/css', cb);
});
gulp.task('clean-html', function(cb) {
  rimraf('./public/index.html', cb);
});
gulp.task('clean-img', function(cb) {
  rimraf('./public/imgs', cb);
});

gulp.task('js', ['clean-js'], function() {
  return gulp.src(config.paths.js)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    // .pipe(babel({
    //   presets: ['es2015']
    // }))
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('css', ['clean-css'], function() {
  return gulp.src(config.paths.sass)
    .pipe(sass())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('html', ['clean-html'], function() {
  return gulp.src(config.paths.html)
    .pipe(gulp.dest('./public/'));
});

gulp.task('img', ['clean-img'], function() {
  return gulp.src(config.paths.img)
    .pipe(gulp.dest('./public/img'));
});

gulp.task('watch', function() {
  gulp.watch(config.paths.sass, ['css']);
  gulp.watch(config.paths.js, ['js']);
  gulp.watch(config.paths.html, ['html']);
});

gulp.task('build', ['js', 'css', 'img', 'html']);
gulp.task('default', ['build', 'watch']);
