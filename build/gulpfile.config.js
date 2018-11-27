const {
  resolve
} = require('./util')

const base = {
  src: resolve('src'),
  dist: resolve('dist'),
  output: {
    css: 'build.css',
    js: 'build.js'
  },
  eslint: {
    rules: {
      'strict': 2
    },
    globals: [
      'jQuery',
      '$'
    ],
    envs: [
      'browser'
    ]
  },
  autoprefixer: {
    browsers: ['last 3 version', 'ie >= 8', 'opera 12.1', 'ios >= 8', 'android >= 4.1'],
    cascade: false
  },
  html: {
    src: resolve('src/**/*.html'),
    dist: resolve('dist')
  },
  css: {
    src: resolve('src/**/*.css'),
    dist: resolve('dist/css')
  },
  sass: {
    src: resolve('src/**/*.scss'),
    dist: resolve('dist/css')
  },
  js: {
    src: resolve('src/**/*.js'),
    dist: resolve('dist/js')
  },
  image: {
    src: resolve('src/images/**/*'),
    dist: resolve('dist/images')
  },
  assets: {
    src: resolve('src/assets/**/*'),
    dist: resolve('dist/assets')
  },
  static: {
    src: resolve('static/**/*'),
    dist: resolve('dist/static')
  }
}

module.exports = {
  dev: {
    ...base,

  },
  prod: {
    ...base,

  }
}