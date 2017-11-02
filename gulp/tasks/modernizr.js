var gulp = require('gulp'),
modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
  return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js']) // point to projects CSS and JS files within gulp.src.
    .pipe(modernizr({
      "options": [
        "setClasses"
      ]
    })) // pipe files through modernizr package. It will look through code and automatically know which features to test for.
    .pipe(gulp.dest('./app/temp/scripts/')); // pipe resulting lightweight file to our destination
});