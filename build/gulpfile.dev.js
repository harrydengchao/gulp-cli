const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const eslint = require('gulp-eslint')
const babel = require('gulp-babel')

const livereload = require('gulp-livereload')

const config = require('./gulpfile.config').dev
const { resolve } = require('./util')

sass.compiler = require('node-sass')

gulp.task('html', function() {
  return gulp.src(config.html.src)
    .pipe(gulp.dest(config.html.dist))
})

gulp.task('sass', function() {
  return gulp.src(config.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest(config.sass.dist))
})


gulp.task('js', function() {
  return gulp.src(config.js.src)
    // .pipe(eslint(config.eslint))
    // .pipe(eslint.formatEach('compact', process.stderr))
    .pipe(babel({
      presets: [
        ['env', {"loose": true}],
        'stage-2'
      ],
      plugins: ['transform-runtime']
    }))
    .pipe(gulp.dest(config.js.dist))
})

gulp.task('watch', function() {
  let watcher = gulp.watch(resolve('src/**/*.scss', ['sass']))
  gulp.watch(resolve('src/**/*.js', ['js']))
  gulp.watch(resolve('src/**/*.html', ['html']))
  watcher.on('change', function(event) {
    console.log(event)
  })
  // let server = livereload()
  // gulp.watch([resolve('dist/**')]).on('change', function(event) {
  //   console.log(event)
  //   // server.changed(event.path);
  // })
})

gulp.task('default', function() {
  gulp.start(
    // 'watch',
    'html',
    'sass',
    'js',
  )
})
