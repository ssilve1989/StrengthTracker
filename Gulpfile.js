/**
 * Created by ssilvestri on 1/4/16.
 */

var gulp = require('gulp');

var config = {
    src : './www/',
    ANDROID_HOME : "./platforms/android/assets/www/",
    BROWSER_HOME : "./platforms/browser/www/"
};

//Gulp Modules
var usemin = require('gulp-usemin');
var sass = require('gulp-sass');
var clean = require('del');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var rev = require('gulp-rev');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('clean', function(){
    "use strict";
    clean([config.ANDROID_HOME, config.ANDROID_HOME]);
});

gulp.task('sass', function(){
    return gulp.src(config.src + 'css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.ANDROID_HOME + 'css'))
});

gulp.task('minify', function(){
    return gulp.src(config.src + 'index.html')
        .pipe(usemin({
            css : [minifyCSS(), 'concat', rev()],
            js : [uglify(), rev()],
            js2 : [uglify(), rev()],
            html : [minifyHTML({empty:true})],
            inlinejs : [uglify()],
            inlinecss : [minifyCSS(), 'concat']
        })).pipe(gulp.dest(config.ANDROID_HOME));
});

gulp.task('copy', function(){
    return gulp.src(config.src + 'js/index.js').pipe(gulp.dest(config.ANDROID_HOME + 'js'))
});

gulp.task('build', ['copy', 'sass', 'minify']);


