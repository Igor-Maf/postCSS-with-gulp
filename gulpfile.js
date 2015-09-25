var gulp = require('gulp'),
	wiredep = require('wiredep').stream,
	concatCSS = require('gulp-concat-css')
	minifyCSS = require('gulp-minify-css')
	rename = require('gulp-rename');


/**
 * For automatically install the all bower 
 * components which were in the bower.json
 */ 
gulp.task('bower', function() {
	gulp.src('./app/index.html')
		.pipe(wiredep({
			directory: 'app/bower_components'	
		}))
		.pipe(gulp.dest('./app'));
});


/**
 * The task for operations with the CSS files
 */
gulp.task('styles', function() {
	gulp.src('./app/css/**/*.css')
		.pipe(concatCSS('styles.css'))
		.pipe(minifyCSS())
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest('app/dist/css/'));
});


/**
 * The changes watcher
 */
gulp.task('watch', function() {
	gulp.watch('bower.json', ['bower'])
	gulp.watch('./app/css/**/*.css', ['styles'])
});


/**
 * Default task
 */
gulp.task('default', function() {
	// default proccess
});