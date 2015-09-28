'use strict';

var gulp = require('gulp'),
	wiredep = require('wiredep').stream,
	minifyCSS = require('gulp-minify-css'),
	concatCSS = require('gulp-concat-css'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	liverload = require('gulp-livereload'),
	connect = require('gulp-connect');


/**
 * bower.json
 */ 
gulp.task('bower', function() {
	gulp.src('./app/*.html')
		.pipe(wiredep({
			directory: 'app/bower_components'	
		}))
		.pipe(gulp.dest('./app'));
});


/**
 * CSS
 */
gulp.task('css', function() {
	gulp.src('./app/css/**/*.css')
		.pipe(autoprefixer('last 4 versions', '> 1%', 'ie 9'))
		.pipe(concatCSS('styles.css'))
		.pipe(minifyCSS())
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest('app/dist/css/'))
		.pipe(connect.reload());
});


/**
 * HTML
 */
gulp.task('html', function() {
	gulp.src('./app/**/*.html')
		.pipe(connect.reload());
});


/**
 * Serve connection
 */
gulp.task('connect', function() {
	connect.server({
		root: './app',
		livereload: true
	});
});


/**
 * The changes watcher
 */
gulp.task('watch', function() {
	gulp.watch('bower.json', ['bower'])
	gulp.watch('./app/css/**/*.css', ['css'])
	gulp.watch('./app/*.html', ['html'])
});


/**
 * Serve task
 */
gulp.task('serve', ['connect', 'html', 'css', 'watch']);


/**
 * Default task
 */
gulp.task('default', function() {
	// default proccess
});