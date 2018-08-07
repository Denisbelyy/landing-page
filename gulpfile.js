'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	cssmin = require('gulp-minify-css'),
	cssimport = require('gulp-import-css'),
	rigger = require('gulp-rigger');

var path = {
    build: { 
        html: '',
        js: 'dist/js/',
        css: 'dist/css/',
        fonts: 'dist/fonts/'
    },
    src: { 
        html: 'app/html/*.html', 
        js: 'app/js/main.js',
        style: 'app/style/main.scss',
        fonts: 'app/fonts/**/*.*'
    },
    watch: { 
        html: 'app/**/*.html',
        js: 'app/js/**/*.js',
        style: 'app/style/**/*.scss',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    clean: './dist'
};
gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger()) 
        .pipe(gulp.dest(path.build.html)); 
});
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(sourcemaps.init()) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.build.js)); 
});
gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        .pipe(sourcemaps.init()) 
        .pipe(cssimport())
        .pipe(sass({includePaths: ['./sass']})) 
        .pipe(prefixer()) 
        .pipe(cssmin()) 
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css));
});
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});
gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build'
]);
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});