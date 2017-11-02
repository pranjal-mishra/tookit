var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	del = require('del'),
	usemin = require('gulp-usemin');
	rev = require('gulp-rev'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify');
	browserSync =  require('browser-sync').create();
var	gutil = require('gulp-util');

gulp.task('previewDocs',function(){
	browserSync.init({
		notify: true,
		server: {
			baseDir: "docs"
		}
	});
})

gulp.task('deleteDistFolder', function() {
	return del("./docs");
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
	var pathsToCopy = [
		'./app/**/*',
		'!./app/*.html',
		'!./app/assets/images/**',
		'!./app/assets/styles/**',
		'!./app/assets/scripts/**',
		'!./app/temp',
		'!./app/temp/**'
	]
	return gulp.src(pathsToCopy)
		.pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages',['deleteDistFolder'],  function() {
	// return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
	return gulp.src(['./app/assets/images/**/*','./app/temp/images/**/*'])
		.pipe(imagemin({
			// optimiszationLevel: 7,
			progressive: true, // optimise jpg images
			interlaced: true, // optimise gif images
			multipass: true // optimise svg images
		}))
		.pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
	gulp.start("usemin"); 
});

gulp.task('usemin', ['styles', 'scripts'], function() {
	return gulp.src("./app/*.html")
		.pipe(usemin({
			css: [function() {return rev()}, function() {return cssnano()}],
			js: [function() {return rev()}, function() {return uglify()}]
			// js: [uglify().on('error', function(err) {gutil.log(gutil.colors.red('[Error]'), err.toString());this.emit('end');}),rev()]
		}))
		.pipe(gulp.dest("./docs"));
});



gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);

