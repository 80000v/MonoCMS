/**
 * Created by labutineg on 12.01.2015.
 *
 */

(function () {
    'use strict';

    // Include gulp
    var gulp = require('gulp');

    var minifyCSS = require('gulp-minify-css');
    var replace = require('gulp-replace');
    var rename = require('gulp-rename');
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');
    var less = require('gulp-less');
    var htmlmin = require('gulp-htmlmin');

    // Minification

    gulp.task('Core-min-CoreJS-JS', function () {

        var pathToJS = [
            'node_modules/core-js/client/core.js'
        ];

        return gulp.src(pathToJS)
            .pipe(concat('corejs.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('apps/core/scripts/'))
            .pipe(gulp.dest('./../dist/site/core/scripts/'));
    });

    gulp.task('Core-min-Static', function () {

        var pathToStatic = [
            'apps/core/content/**/*.{jpg,gif,png,otf,eot,ttf,woff,woff2,eof,svg,ico,json}'
        ];

        return gulp.src(pathToStatic)
            .pipe(gulp.dest('apps/core/content/'))
            .pipe(gulp.dest('./../dist/site/core/content/'));
    });

    gulp.task('Core-min-Backend', function () {

        var pathToBackend = [
            './../backendSrc/MonoCMS/bin/Release/MonoCMS.exe',
            './../backendSrc/MonoCMS/bin/Release/**/*.dll'
        ];

        return gulp.src(pathToBackend)
            .pipe(gulp.dest('./../dist/'));
    });

    gulp.task(
        'Core-Watch-Backend',
        ['Core-min-Backend'],
        function () {
            gulp.watch('./../backendSrc/MonoCMS/bin/Release/**/*.{exe,dll}', ['Core-min-Backend']);
        }
    );

    gulp.task('Core-min-All', [
        'Core-min-CoreJS-JS',
        'Core-min-Static',
        'Core-min-Backend'
    ]);

}());
