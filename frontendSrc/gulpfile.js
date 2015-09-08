/**
 * Created by labutineg on 30.12.2014.
 *
 */

(function () {
    "use strict";
    var gulp = require('gulp');

    var requireDir = require('require-dir');
    var dir = requireDir('./gulptasks');

    gulp.task('release', ['Globus-min-CSS', 'Globus-min-JS', 'Globus-min-HTML', 'Globus-min-JSP']);

    gulp.task('default', ['release']);

}());