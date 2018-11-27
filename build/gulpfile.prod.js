const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const htmlmin = require('gulp-htmlmin')
const cssmin = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const rename = require('gulp-rename')
const babel = require('gulp-babel')

const config = require('./gulpfile.config').prod
const { resolve } = require('./util')

sass.compiler = require('node-sass')

gulp.task('html', function() {
  return gulp.src(config.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(config.html.dist))
})

gulp.task('sass', function() {
  return gulp.src(config.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest(config.sass.dist))
    .pipe(cssmin({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
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
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.js.dist))
})

gulp.task('compress:image', function() {
  return gulp.src(config.image.src)
    .pipe(imagemin())
    .pipe(gulp.dest(config.image.dist))
})

gulp.task('default', function() {
  gulp.start(
    'html',
    'sass',
    'js',
    'compress:image',
  )
})
