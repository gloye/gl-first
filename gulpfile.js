"use strict";

// gulp
var gulp = require('gulp');

// require plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

// jshint
gulp.task('lint', function () {
  gulp.src('./js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

// sass
gulp.task('sass', function () {
  gulp.src('./scss/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./css'));
});

// js min
gulp.task('scripts', function () {
  gulp.src('./js/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('./dist'))
      .pipe(rename('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist'));
});


//gulp server
gulp.task('connect',function(){
      connect.server({
        root: '.',
        livereload: true,
        port: 3100
      });
    }
)
//config path
var config = {
    htmlPath:'my_note',
    cssPath:'my_note',
    jsPath:'my_note'
}
gulp.task('html', function () {
  gulp.src('<%= config.htmlPath %>/*.html')
      .pipe(connect.reload());
});

gulp.task('style', function () {
  gulp.src('<%= config.cssPath %>/*.css')
      .pipe(connect.reload());
});

gulp.task('scripts', function () {
  gulp.src('my_note/*.js')
      .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['<%= config.htmlPath %>/.html'], ['html']);
  gulp.watch(['<%= config.cssPath %>/*.css'], ['style']);
  gulp.watch(['my_note/*.js'], ['scripts']);
});

//connect & watch
gulp.task('default', ['connect','watch']);