/**
 * Created by labutineg on 30.12.2014.
 *
 */

(function () {
    'use strict';

    const gulp = require('gulp');

    function dropException(message) {
        throw new Error(message);
    }

    const minNodeVersion = [5, 7, 0];
    const nodeVersion = process
        .version
        .substring(1, process.version.length)
        .split('.')
        .map((value, index) => {
            return Number(value) < minNodeVersion[index] ?
                dropException('Ошибка версии Node.js, минимальная версия ' + minNodeVersion.join('.')) : value;
        });

    global.DEBUG = true;
    global.APPS_NAMES = [
        'CMS',
        'Admin'
    ];

    const requireDir = require('require-dir');
    const dir = requireDir('./gulptasks');

    gulp.task(
        'release',
        global.APPS_NAMES.map(name => name + '-min-All')
    );

    gulp.task('default', ['release']);

}());
