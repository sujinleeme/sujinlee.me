var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var htmlreplace = require('gulp-html-replace');
var uglify = require('gulp-uglify');
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
	html: templates + '/*.html',
  css: src + '/css/*.css',
};

//'<script src="{% static "' + filepath + '" %}"></script>';

gulp.task('htmlreplace', function() {
  gulp.src('myblog/templates_build/blog/base.html')
    .pipe(htmlreplace({
      'js': 'js/highlight.pack.js'
    }))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('myblog/static/dist/js'));
});

gulp.task('combine-js', function () {
	return gulp.src(paths.js)
		.pipe(concat('script.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dist + '/js'));
});

// gulp.task('useref', function(){
//   return gulp.src('myblog/templates/blog/*.html')
//     .pipe(useref())
//     .pipe(gulp.dest('dist'))
// });


gulp.task('sass', function() {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest(src + '/css'))
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
  gulp.watch('myblog/static/src/scss/*.scss', ['sass']);
  gulp.watch(['myblog/templates/blog/*.html', 'myblog/static/src/css/**/*.css', 'myblog/static/src/js/**/*.js'], reload);
  
  //gulp.watch('myblog/static/src/**/*.js', reload);
  //gulp.watch('myblog/static/js/**/*.js', reload);
})