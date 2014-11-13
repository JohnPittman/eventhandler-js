'use strict'

var gulp = require('gulp');
var uglify = require('gulp-uglify');

var JS_SRC = 'src/**/*.js';
var DIST = 'dist';

gulp.task('default', function() {});

gulp.task('compress', function() {
    gulp.src(JS_SRC)
        .pipe(uglify())
        .pipe(gulp.dest(DIST));
});

gulp.task('build', ['compress']);
