var gulp = require('gulp')
var postcss = require('gulp-postcss')
var cssnested = require('postcss-nested')
var cssnext = require('cssnext')
var cssmixins = require('postcss-mixins')
var csswring = require('csswring')
var mqpaker = require('css-mqpacker')
var cssimport = require('postcss-import')
var csslost = require('lost')
var browserSync = require('browser-sync').create()

// Servidor de desarrollo
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
})

// Tarea para procesar el CSS
gulp.task('css', function () {
  var processors = [
    cssimport(),
    cssmixins(),
    cssnested(),
    cssnext({ browsers: ["> 0%" , "ie 8"] }),
    csslost(),
    mqpaker()
    //csswring()
  ]

  return gulp.src('./src/style.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())

})

// Tarea para vigilar los cambios
gulp.task('watch', function () {
    gulp.watch('./src/*.css', ['css'])
    gulp.watch('./src/*.pcss', ['css'])
    gulp.watch('./dist/*.html').on('change', browserSync.reload)
    gulp.watch('./dist/portfolio/*.html').on('change', browserSync.reload)
})

gulp.task('default', ['watch', 'serve'])
