var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var htmlreplace = require('gulp-html-replace');
var gulpIf = require('gulp-if');
var concat = require('gulp-concat');
var reload = browserSync.reload;

// path
var src = 'myblog/static/src';
var dist = 'myblog/static/dist';
var templates = 'myblog/templates'
var paths = {
	js: src + '/js/*.js',
	scss: src + '/scss/*.scss',
	html: templates + '/**/*.html',
  css: dist + '/css/**/*.css',
};

gulp.task('combine-js', function () {
   return gulp.src(paths.js)
    .pipe(concat('script.min.js'))
		.pipe(gulp.dest(dist + '/js'))
});

gulp.task('sass', function() {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest(dist + '/css'))
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


gulp.task('watch', ['browserSync', 'sass', 'combine-js'], function() {
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(['paths.html', 'paths.css', 'paths.js'], reload);
})