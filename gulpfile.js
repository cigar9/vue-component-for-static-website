var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browser = require('browser-sync'),
  plumber = require("gulp-plumber"),
  notify = require("gulp-notify"),
  ejs = require('gulp-ejs'),
  changed = require('gulp-changed'),
  htmlbeautify = require('gulp-html-beautify'),
  uglify = require("gulp-uglify"),
  include = require("gulp-include"),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  mqpacker = require('css-mqpacker'),
  sortCSSmq = require('sort-css-media-queries'),
  rename = require('gulp-rename'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  mozjpeg = require('imagemin-mozjpeg'),
  gulpWebpack = require('gulp-webpack'),
  webpack = require('webpack'),
  newer = require('gulp-newer'),
  fs = require('fs');

var paths = {
  work: 'src',
  scss: 'src/sass/**/*.scss',
  js: 'src/js/**/*.js',
  html: 'src/**/*.html',
  image: 'src/image/**/*',
  ejs: "src/ejs/**/*.ejs",
  fonts: 'src/fonts/**/*',
  dist: 'dist',
  distCss: 'dist/css'
};

gulp.task('server', function () {
  browser({
    server: {
      baseDir: paths.dist
    }
  });
});

gulp.task('image', function () {
  gulp
    .src([paths.image], {
      base: paths.work
    })
    .pipe(plumber())
    .pipe(newer(paths.dist))
    .pipe(imagemin([
      pngquant({
        quality: '80-90',
        speed: 1,
        floyd: 0
      }),
      mozjpeg({
        quality: 95,
        progressive: true
      })
    ]))
    .pipe(gulp.dest(paths.dist))
    .pipe(browser.reload({
      stream: true
    }));
});

gulp.task('fonts', function () {
  gulp
    .src([paths.fonts], {
      base: paths.work
    })
    .pipe(plumber())
    .pipe(changed(paths.dist))
    .pipe(gulp.dest(paths.dist))
    .pipe(browser.reload({
      stream: true
    }));
});

gulp.task('sass', function () {
  gulp
    .src(paths.scss)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'last 2 versions',
          'ie >= 9',
          'Android >= 4',
          'iOS >= 7'
        ]
      }),
      mqpacker({
        sort: sortCSSmq
      })
    ]))
    .pipe(gulp.dest(paths.distCss))
    .pipe(browser.reload({
      stream: true
    }));
});

gulp.task('js', function () {
  gulp
    .src([
      'src/js/**/*.js',
      '!src/js/**/_*.js'
    ], {
      base: paths.work
    })
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(include())
    // .pipe(uglify({
    //   mangle: false,
    //   preserveComments: 'some',
    //   compress: false,
    //   output: {
    //     beautify: true,
    //     indent_level: 2
    //   }
    // }))
    .pipe(changed(paths.dist))
    .pipe(gulp.dest(paths.dist))
    .pipe(browser.reload({
      stream: true
    }));
});

// jsをwebpackでまとめる（圧縮、ソースマップの出力）
gulp.task('gulpWebpack', function() {
  gulp
    .src([paths.js], {
      base: paths.work
    })
    .pipe(gulpWebpack({
      entry: [
        __dirname + '/src/js/main.js'
      ],
      output: {
        filename: "bundle.js",
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: {warnings: false},
          output: {comments: false},
          sourceMap: true
        })
      ],
      devtool: 'sourcemap'
    }))
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    // .pipe(changed('dist/html/js/'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(browser.reload({
      stream: true
    }));
});

gulp.task('ejs', function () {
  var json = JSON.parse(fs.readFileSync('src/ejs/_data/meta.json'))
  gulp
    .src(['src/ejs/**/*.ejs', '!src/ejs/**/_*.ejs'])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(ejs({json}))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(htmlbeautify({
      'indent_size': 2,
      'indent_with_tabs': false
    }))
    .pipe(changed(paths.dist))
    .pipe(gulp.dest(paths.dist))
    .pipe(browser.reload({
      stream: true
    }));
});

gulp.task('watch', function () {
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.js, ['js']);
  // gulp.watch('src/js/main.js', ['gulpWebpack']);
  gulp.watch(paths.image, ['image']);
  gulp.watch(paths.ejs, ['ejs']);
  gulp.watch(paths.fonts, ['fonts']);
});

gulp.task('default', ['watch', 'server']);

gulp.task('imagemin', function () {
  return gulp.src([paths.image], {
      base: paths.work
    })
    .pipe(plumber())
    .pipe(imagemin([
      pngquant({
        quality: '80-90',
        speed: 1,
        floyd: 0
      }),
      mozjpeg({
        quality: 95,
        progressive: true
      })
    ]))
    .pipe(gulp.dest(paths.dist));
});

// 全ファイルを再生成（[gulp compile]）
gulp.task('compile', [
  'image',
  'fonts',
  'sass',
  // 'gulpWebpack',
  'js',
  'ejs'
]);