/**
 * Created by labutineg on 12.01.2015.
 *
 */
(function () {
    'use strict';

    // Include gulp
    var gulp = require('gulp');

    // main
    var replace = require('gulp-replace');
    var livereload = require('gulp-livereload');
    var rename = require('gulp-rename');
    var plumber = require('gulp-plumber');
    var size = require('gulp-size');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');
    var notify = require('gulp-notify');

    // css, less
    var csscomb = require('gulp-csscomb');
    var autoprefixer = require('gulp-autoprefixer');
    var minifyCSS = require('gulp-minify-css');
    var less = require('gulp-less');
    var csslint = require('gulp-csslint');

    // js
    var browserify = require('browserify');
    var preprocessify = require('preprocessify');
    var watchify = require('watchify');

    // html, jsp
    var htmlmin = require('gulp-htmlmin');
    var htmlhint = require('gulp-htmlhint');

    var appName = 'index';

    // Code Style
    gulp.task('Pad-CS-LESS', function () {

        var pathToCSSAll = 'apps/' + appName + '/**/*.less';

        return gulp.src(pathToCSSAll)
            .pipe(csslint())
            .pipe(csscomb())
            .pipe(gulp.dest('apps/' + appName + '/'));

    });

    gulp.task('Pad-CS-TS', function () {

        var pathToJSAll = 'apps/' + appName + '/**/*.ts';

        return gulp.src(pathToJSAll);

    });

    gulp.task('Pad-CS-HTML', function () {

        var pathToHTMLAll = 'html/' + appName + '/**/*.html';

        return gulp.src(pathToHTMLAll)
            .pipe(htmlhint({'tag-pair': false, 'doctype-first': false}));

    });

    gulp.task('Pad-CS-All', ['Pad-CS-LESS', 'Pad-CS-TS', 'Pad-CS-HTML']);

    // Minification

    gulp.task('Pad-min-IMG', function () {

        var pathToImg = 'apps/' + appName + '/content/**/*.{jpg,gif,png,ico}';

        return gulp.src(pathToImg)
            .pipe(plumber())
            .pipe(gulp.dest('./../dist/site/' + appName + '/content/'));
    });

    gulp.task('Pad-min-LESS', ['Pad-min-HTML'], function () {

        var pathToLESS = 'apps/' + appName + '/content/less/imports.less';

        return gulp.src(pathToLESS)
            .pipe(plumber())
            .pipe(less())
            .pipe(autoprefixer({
                browsers: ['last 10 versions', 'Firefox >= 15', 'iOS >= 5'],
                cascade: false
            }))
            .pipe(csslint())
            .pipe(minifyCSS({keepBreaks: false, keepSpecialComments: false, rebase: false}))
            .pipe(rename({basename: 'main', suffix: '.min', extname: '.css'}))
            .pipe(size({title: 'CSS Size: '}))
            .pipe(gulp.dest('./../dist/site/' + appName + '/content/css/'));

    });

    var watchJS = false;
    var startTime = Date.now();
    var minifyJS = function (b) {

        b.bundle()
            .on('error', function (err) {
                console.error('Error in Browserify: \n', err.message);
                this.emit('end');
            })
            .pipe(plumber())
            .pipe(source('bundled.js'))
            .pipe(buffer())
            .pipe(replace(/\n/g, ''))
            .pipe(rename({basename: 'main', suffix: '.min'}))
            .pipe(size({title: 'JS Size: '}))
            .pipe(gulp.dest('./../dist/site/' + appName + '/scripts/'))
            .pipe(notify({
                title: 'Minify JS',
                message: 'Finished \'Pad-min-TS\' after ' + ((Date.now() - startTime) / 1000) + ' ms'
            }))
            .pipe(livereload());

    };

    gulp.task('Pad-min-TS', ['Pad-min-HTML'], function () {

        var pathToJSApp = 'apps/' + appName + '/scripts/main.ts';

        var b = browserify({
            cache: {},
            packageCache: {},
            fullPaths: true
        })
            .plugin('tsify', {
                target: 'ES5',
                module: 'commonjs',
                noImplicitAny: true,
                suppressImplicitAnyIndexErrors: true
            })
            .transform(preprocessify({DEBUG: true}))
            .transform({
                global: true
            }, 'uglifyify')
            .add(pathToJSApp);

        if (watchJS) {
            // if watch is enable, wrap this bundle inside watchify
            b = watchify(
                b,
                {
                    delay: 0,
                    ignoreWatch: true,
                    poll: 1000
                }
            );
            b.on('update', function () {
                startTime = Date.now();
                minifyJS(b);
            });
        }

        minifyJS(b);

    });

    gulp.task('Pad-min-HTML', function () {

        var pathToHTMLAll = 'html/' + appName + '.html';

        return gulp.src(pathToHTMLAll)
            .pipe(plumber())
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(size({title: 'HTML Size: '}))
            .pipe(gulp.dest('./../dist/site/'));

    });

    gulp.task('Pad-min-All', ['Pad-min-LESS', 'Pad-min-TS', 'Pad-min-HTML', 'Pad-min-IMG']);

    // Watchers
    gulp.task('Pad-watch-min', ['Pad-min-All'], function () {

        livereload.listen();
        gulp.watch('src/main/webappsrc/**/*.less', ['Pad-min-LESS']);
        gulp.watch('src/main/webappsrc/**/*.ts', ['Pad-min-TS']);
        gulp.watch('src/main/webappsrc/**/*.html', ['Pad-min-HTML']);

        // for watchify watcher. Comment gulp watcher and uncomment this code.
        /*watchJS = true;
        gulp.start('Pad-min-TS');*/

    });

}());
