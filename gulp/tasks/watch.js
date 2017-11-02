var gulp = require('gulp'),
	watch = require('gulp-watch'),
	browserSync =  require('browser-sync').create();

gulp.task('watch', function(){

	browserSync.init({
		notify: true,
		server: {
			baseDir: "app",
			index:"index.html"	
		}
	});

	watch('./app/*.html', function() {
		browserSync.reload('*.html');
	});

	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('cssInject');
	});

	watch('./app/assets/scripts/**/*.js', function() {
		gulp.start('scriptsRefresh');
	});

});

gulp.task('cssInject', ['styles'],function(){
	return gulp.src('./app/temp/styles/*.css')
	.pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
	browserSync.reload();
});