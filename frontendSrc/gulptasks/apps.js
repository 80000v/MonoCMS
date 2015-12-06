/**
 * Created by labutineg on 12.01.2015.
 *
 */

(function () {
    'use strict';

    // Include gulp
    const gulp = require('gulp');

    // node
    const fs = require('fs');

    // main
    const replace = require('gulp-replace');
    const livereload = require('gulp-livereload');
    const rename = require('gulp-rename');
    const plumber = require('gulp-plumber');
    const size = require('gulp-size');
    const source = require('vinyl-source-stream');
    const buffer = require('vinyl-buffer');
    const notify = require('gulp-notify');

    // css, less
    const csscomb = require('gulp-csscomb');
    const autoprefixer = require('gulp-autoprefixer');
    const minifyCSS = require('gulp-minify-css');
    const less = require('gulp-LESS');
    const csslint = require('gulp-csslint');

    // ts
    const browserify = require('browserify');
    const preprocessify = require('preprocessify');
    const watchify = require('watchify');
    const tslint = require('gulp-tslint');
    const stringify = require('stringify');

    // html, jsp
    const htmlmin = require('gulp-htmlmin');
    const htmlhint = require('gulp-htmlhint');

    function registerTask(appName) {
        let appNameLC = appName.toLowerCase();

        /**
         * Code Style
         */

        gulp.task(
            appName + '-CS-LESS',
            function () {
                const pathToCSSAll = 'apps/' + appNameLC + '/**/*.{css,less}';
                return gulp.src(pathToCSSAll)
                    .pipe(csslint())
                    .pipe(csscomb())
                    .pipe(gulp.dest('apps/' + appNameLC + '/'));
            }
        );

        gulp.task(
            appName + '-CS-TS',
            function () {
                const pathToJSAll = 'apps/' + appNameLC + '/**/*.ts';
                return gulp.src(pathToJSAll)
                    .pipe(tslint())
                    .pipe(tslint.report(
                        'verbose',
                        {
                            emitError: false,
                            summarizeFailureOutput: true
                        })
                    );
            }
        );

        gulp.task(
            appName + '-CS-HTML',
            function () {
                const pathToJSPAll = 'apps/' + appNameLC + '/index.html';
                return gulp.src(pathToJSPAll)
                    .pipe(htmlhint({'spec-char-escape': false, 'doctype-first': false}))
                    .pipe(htmlhint.reporter('default'));
            }
        );

        gulp.task(
            appName + '-CS-All',
            [
                appName + '-CS-LESS',
                appName + '-CS-TS',
                appName + '-CS-HTML'
            ]
        );

        /**
         * Minification
         */

        gulp.task(
            appName + '-min-IMG',
            function () {
                const pathToImg = 'apps/' + appNameLC + '/content/**/*.{jpg,gif,png,ico,json,svg}';
                return gulp.src(pathToImg)
                    .pipe(plumber())
                    .pipe(gulp.dest('./../dist/site/' + appNameLC + '/content/'));
            }
        );

        gulp.task(
            appName + '-min-LESS',
            [appName + '-min-HTML'],
            function () {
                const pathToLESS = 'apps/' + appNameLC + '/content/less/imports.less';
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
                    .pipe(gulp.dest('./../dist/site/' + appNameLC + '/content/css/'));
            }
        );

        let watchJS = false;
        let startTime = Date.now();
        let minifyJS = function (b) {

            gulp.start(appName + '-min-HTML');

            b.bundle()
                .on('error', function (err) {
                    console.error('Error in Browserify: \n', err.message);
                    this.emit('end');
                })
                .pipe(plumber())
                .pipe(source('bundled.js'))
                .pipe(buffer())
                .pipe(replace(/\n/g, ''))
                // .pipe(replace(/"use strict"/g, '"use strong"'))
                .pipe(rename({basename: 'main', suffix: '.min'}))
                .pipe(size({title: 'JS Size: '}))
                .pipe(gulp.dest('./../dist/site/' + appNameLC + '/scripts/'))
                .pipe(notify({
                    title: appName + ':',
                    message: appName + '-min-TS: ' + ((Date.now() - startTime) / 1000) + ' s'
                }))
                .pipe(livereload());

        };

        gulp.task(
            appName + '-min-TS',
            function () {

                const pathToJSApp = 'apps/' + appNameLC + '/scripts/Main.ts';

                let b = browserify(
                    {
                        cache: {},
                        packageCache: {},
                        fullPaths: true
                    }
                )
                    .plugin(
                        'tsify',
                        {
                            target: 'ES5',
                            module: 'commonjs',
                            noImplicitAny: true,
                            suppressImplicitAnyIndexErrors: true,
                            experimentalDecorators: true,
                            experimentalAsyncFunctions: true
                        }
                    )
                    .transform(
                        preprocessify(
                            {
                                DEBUG: global.DEBUG
                            },
                            {
                                includeExtensions: ['.js', '.ts']
                            }
                        )
                    )
                    .transform(
                        stringify(
                            {
                                extensions: ['.txt', '.html'],
                                minify: true,
                                minifier: {
                                    extensions: ['.html'],
                                    options: {
                                        // html-minifier options
                                    }
                                }
                            }
                        )
                    )
                    .transform(
                        {
                            global: true
                        },
                        'uglifyify'
                    )
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
                    b.on(
                        'update',
                        function () {
                            startTime = Date.now();
                            minifyJS(b);
                        }
                    );
                }

                minifyJS(b);

            }
        );

        gulp.task(
            appName + '-min-HTML',
            function () {
                const pathToJSPApp = 'apps/' + appNameLC + '/index.html';
                return gulp.src(pathToJSPApp)
                    .pipe(plumber())
                    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
                    .pipe(replace(/\{_date_\}/g, new Date().getTime()))
                    .pipe(size({title: 'JSP Size: '}))
                    .pipe(gulp.dest('src/main/webapp/jsp/'));
            }
        );

        gulp.task(
            appName + '-min-All',
            [
                appName + '-min-LESS',
                appName + '-min-TS',
                appName + '-min-HTML',
                appName + '-min-IMG'
            ]
        );

        // Watchers
        gulp.task(
            appName + '-Watch-Min',
            [appName + '-min-All'],
            function () {
                livereload.listen();
                gulp.watch('src/main/webappsrc/**/*.{css,less}', [appName + '-min-LESS']);
                // gulp.watch('src/main/webappsrc/**/*.{js,ts}', [appName + '-min-TS']);
                gulp.watch('src/main/webappsrc/**/*.jsp', [appName + '-min-HTML']);

                watchJS = true;
                gulp.start(appName + '-min-TS');
            }
        );

    }

    const appsName = global.APPS_NAMES;

    for (let i = 0; i < appsName.length; i += 1) {
        registerTask(appsName[i]);
    }

})();
