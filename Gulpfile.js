/**
 * Created by ssilvestri on 1/4/16.
 */

var gulp = require('gulp');

var config = {
    src : './dev/',
    dest : './www/'
};

//Gulp Modules
var connect = require('gulp-connect');
var usemin = require('gulp-usemin');
var sass = require('gulp-sass');
var clean = require('del');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var rev = require('gulp-rev');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('connect', function(){
    connect.server({
        port: 8080,
        root: './dev'
    });
});

gulp.task('clean', function(){
    clean([config.dest]);
});

gulp.task('sass', function(){
    return gulp.src(config.src + 'css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest + 'css'))
});

gulp.task('minify', function(){
    return gulp.src(config.src + 'index.html')
        .pipe(usemin({
            css : [minifyCSS(), 'concat', rev()],
            js : [uglify(), rev()],
            js2 : [uglify(), rev()],
            html : [minifyHTML({empty:true})],
        })).pipe(gulp.dest(config.dest));
});

gulp.task('copy', function(){
    gulp.src(config.src + "views/*").pipe(gulp.dest(config.dest + "views"));
    gulp.src(config.src + 'bower_components/font-awesome/fonts/**/*').pipe(gulp.dest(config.dest + 'fonts/'));
    return gulp.src(config.src + 'js/index.js')
        .pipe(gulp.dest(config.dest + 'js'))
});

gulp.task('build', ['copy', 'sass', 'minify']);