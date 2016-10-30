var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;

gulp.task('sass', function() {
  return gulp.src('myblog/static/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('myblog/static/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('runserver', function() {
  var proc = exec('python manage.py runsslserver')
})

gulp.task('browserSync', ['runserver'], function() {
  browserSync.init({
    notify: false,
    port: 8000,
    proxy: 'https://127.0.0.1:8000/'
  })
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('myblog/static/scss/**/*.scss', ['sass']);
  gulp.watch('myblog/static/js/**/*.js', browserSync.reload);
  gulp.watch('myblog/templates/blog/*.html', browserSync.reload);
})