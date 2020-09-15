// General
const gulp = require('gulp'),
			autoprefixer = require('gulp-autoprefixer'),
			browserSync = require('browser-sync').create(),
			reload = browserSync.reload,
			sass = require('gulp-sass'),
			concat = require('gulp-concat'),
			uglify = require('gulp-uglify'),
			pugJs = require('gulp-pug');


// the order in which we concatenate the js files
const jsConcatOrder = [
	'app/js/jquery-3.3.1.slim.min.js',
	'app/js/bootstrap.bundle.min.js',
	'app/js/main.js'
];


// Compile scss into css
function style() {
	// 1. Location of the main scss file to compile; add sourcemaps
	return gulp.src('app/scss/bootstrap.scss', {sourcemaps: true})
	// 2. Pass the file through sass compiler; compress it; handle errors
				.pipe(sass({outputStyle: 'compressed'})).on('error', sass.logError)
	// 3. Use autoprefixer
				.pipe(autoprefixer('last 2 versions'))
	// 4. Use concat to rename the file(s)
				.pipe(concat('style.css'))
	// 5. Where to save the compiled scss; where to put the sourcemaps
				.pipe(gulp.dest('dist/css', {sourcemaps: '.'}))
}


// Concat and minify js
function javascript() {
	// 1. location of js files; using the jsConcatOrder variable
	return gulp.src(jsConcatOrder)
	// 2. Concatenate the files
				.pipe(concat('main.js'))
	// 3. Minify the js
				.pipe(uglify())
	// 4. Where to save the js
				.pipe(gulp.dest('dist/js'))
}


// Compile pug to html
function pug() {
	// 1. Location of the pug files
	return gulp.src('app/pug/*.pug')
	// 2. Format the output
				.pipe(pugJs({
			    doctype: 'html',
			    pretty: true
			  }))
	// 3. Where to save the files
				.pipe(gulp.dest('dist/'))
}


// Watch
function watch() {
	browserSync.init({
		// Serve files from the app directory with directory listing
		server: {
		    baseDir: "dist",
		    directory: true
		}
	});
	// watch all the scss files in all subfolders; then call the style function; then reload the page
	gulp.watch('app/scss/**/*.scss', style);
	// watch all the js files; then call the javascript function; then reload the page
	gulp.watch('app/js/**/*.js', javascript);
	// watch all the pug files; then call the pug function
	gulp.watch('app/pug/**/*.pug', pug);
	// reload the page when changes to files apply
	gulp.watch(['dist/css/style.css', 'dist/js/main.js', 'dist/*.html']).on('change', browserSync.reload);
}

exports.style = style;
exports.javascript = javascript;
exports.pug = pug;
exports.watch = watch;
