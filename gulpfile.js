const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const minifyCss = require('gulp-clean-css');

const sources = {
  css: __dirname + '/src/client/vendor/css/*.css',
  public: __dirname + '/src/client/public'
};

gulp.task('bundle:css', function() {
  return gulp.src(sources.css)
  .pipe(concatCss('styles.min.css'))
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(gulp.dest(sources.public));
});

gulp.task('default', ['bundle:css']);
