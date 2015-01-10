var gulp        = require('gulp'),
	browserify    = require('browserify'),
	browserSync   = require('browser-sync'),
	transform     = require('vinyl-transform'),
	ext           = require('gulp-ext-replace'),
	reactify      = require('reactify'),
	uglify        = require('gulp-uglify');

gulp.task('browser-sync', function() {
		browserSync({
				server: {
						baseDir: "./"
				}
		});
});

var browserified = function(debug) {
	return transform(function(filename) {
		var b = browserify({
			noParse: [
				'jquery',
				'underscore',
				'react-router'
			],
			entries: filename,
			debug: debug
		});
		b.transform(reactify)
		return b.bundle();
	});
};

gulp.task('demo', ['build-demo','browser-sync'], function() {
	gulp.watch("src/demo.jsx", ['build-demo', browserSync.reload]);
	gulp.watch("src/vitullo-spinner.jsx", ['build-dev', browserSync.reload]);
	gulp.watch("*.html", browserSync.reload);
});

gulp.task('build-demo', function() {
	return gulp.src(['src/demo.jsx'])
		.pipe(browserified(true))
		// .pipe(uglify())
		.pipe(ext('.js'))
		.pipe(gulp.dest('./build'));
});

gulp.task('build-dev', function() {
	return gulp.src(['src/vitullo-spinner.jsx'])
		.pipe(browserified(true))
		.pipe(ext('.js'))
		.pipe(gulp.dest('./build'));
});

gulp.task('finish-prod', function() {
	return gulp.src(['src/vitullo-spinner.jsx'])
		.pipe(browserified(false))
		.pipe(uglify())
		.pipe(ext('.js'))
		.pipe(gulp.dest('./build'));
});
