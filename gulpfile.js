let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let del = require('del');
let autoprefixer = require('gulp-autoprefixer');




gulp.task('clean', async () => {
  del.sync('dist')
})

gulp.task('scss', () => {
  return gulp.src('app/src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(['last 8 versions']))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/src/css'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css', () => {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/src/scss'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', () => {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('script', () => {
  return gulp.src('app/src/js/*.js')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', () => {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js',
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/src/js'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
});

gulp.task('export', () => {
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  let buildCss = gulp.src('app/src/css/**/*.css')
    .pipe(gulp.dest('dist/src/css'));

  let buildJs = gulp.src('app/src/js/**/*.js')
    .pipe(gulp.dest('dist/src/js'));

  let buildFonts = gulp.src('app/src/assets/fonts**/*.*')
    .pipe(gulp.dest('dist/src/assets/fonts'));

  let buildImg = gulp.src('app/src/assets/img**/*.*')
    .pipe(gulp.dest('dist/src/assets/img'));
});

gulp.task('watch', () => {
  gulp.watch('app/src/scss/**/*.scss', gulp.parallel('scss'))
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/src/js/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean','export'));

gulp.task('default', gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch'));




