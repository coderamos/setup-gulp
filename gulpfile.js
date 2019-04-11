const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// LOGS MESSAGE
gulp.task('message', function () {
  return console.log('GULP IS WORKING...');
});

// COPY HTML FILES
gulp.task('copyHtml', function () {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

// OPTIMIZE IMAGES
gulp.task('imageMin', () =>
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
);

// MINIFY JS
gulp.task('minify', function () {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// COMPILE SASS
gulp.task('sass', function () {
  gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
});

// SCRIPTS
gulp.task('scripts', function () {
  gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// SERVE
gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: './dist',
  });
});

// WATCH FILES
gulp.task('watch', function () {
  gulp.watch('src/*.html', ['copyHtml']).on('change', browserSync.reload);
  gulp.watch('src/js/*.js', ['scripts']).on('change', browserSync.reload);
  gulp.watch('src/images/*', ['imageMin']).on('change', browserSync.reload);
  gulp.watch('src/scss/*.scss', ['sass']).on('change', browserSync.reload);
});

gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'scripts', 'serve', 'watch']);
