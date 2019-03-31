var gulp = require('gulp');
var watch = require('gulp-watch');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var data = require('gulp-data');
var browserSync = require('browser-sync').create();
/*==========scss error checker =========*/
var { gulpSassError } = require('gulp-sass-error');

/*========nunjucks add partial design ======*/
var nunjucksRender = require('gulp-nunjucks-render');

// gulp.task('nunjucks', function() {
//   return gulp.src('app/pages/**/*.+(html|nunjucks)')
//     // Adding data to Nunjucks
  
//     .pipe(nunjucksRender({
//       path: ['app/templates']
//     }))
//     .pipe(gulp.dest('app'))
// });


gulp.task('nunjucks', function () {
  return gulp.src('app/pages/**/*.+(html|nunjucks)')
    .pipe(nunjucksRender({
      path: ['app/templates'] // String or Array
    }))
    .pipe(gulp.dest('app'));
});

/*========nunjucks add partial design ======*/

var throwError = true;
gulp.task('scss', function(){
  return gulp.src('app/assets/scss/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass() .on('error', gulpSassError(throwError)))
  .pipe(autoprefixer({ browsers: ['last 2 versions'],
  cascade: false}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('app/assets/css/'))
});

/*image comress */
var imagemin = require('gulp-imagemin');
gulp.task('imagecompress',function (){
  return gulp.src('app/assets/images/*')
  .pipe(imagemin({
    pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      svgo: true
  }))
  .pipe(gulp.dest('app/assets/image-compress'))
}
);
 
// gulp.task('watch', function(){
//     gulp.watch('app/assets/scss/**/*.scss',['scss']);
//   //  gulp.watch('app/assets/image-compress',['*.jpg','*.png','*.svg']);
//    // gulp.watch(['app/**/*.html'], ['nunjucks']);

// })
gulp.task('watch', function() {

  gulp.watch('app/assets/scss/**/*.scss', gulp.series('scss'));
 
});