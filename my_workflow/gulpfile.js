var gulp = require('gulp');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var reload = browserSync.reload;

//spritesmith
var spritesmith = require('gulp.spritesmith');
var buffer = require('vinyl-buffer');
var merge = require('merge-stream');
var gm = require('gulp-gm');
//sass
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sass = require('gulp-sass');
//pug
var changed = require('gulp-changed');
var pug = require('gulp-pug');

//utils 
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}


// resize imgs
gulp.task('resize-images', function resizeImages() {
  return gulp.src('src/images/icons/*.png')
    .pipe(gm(function handleGm(gmfile, done) {
      gmfile.size(function handleSize(err, size) {
        if (err) {
          return done(err);
        }
        if (size.width % 2 === 0 && size.height % 2 === 0) {
          return done(null, gmfile);
        }
        // http://www.imagemagick.org/Usage/crop/#extent
        return done(null, gmfile
          .background('transparent')
          .gravity('northwest')
          .extent(size.width + (size.width % 2), size.height + (size.height % 2)));
      });
    }))
    .pipe(gulp.dest('src/images/icons'));
});

gulp.task('gm-img', function () {
  return gulp.src([
    'src/images/icons/cash@2x.png'
  ])
    .pipe(gm(function handleGm(gmfile, done) {
      gmfile.size(function handleSize(err, size) {
        return done(null, gmfile
          .background('transparent')
          .gravity('northwest')
          .extent(44,40));
      });
    }))
    .pipe(gulp.dest('src/images/icons'));
})

// 雪碧图
gulp.task('sprite', function () {
  var spriteData = gulp.src('src/images/icons/*.png')
    .pipe(spritesmith({
      retinaSrcFilter: ['src/images/icons/*@2x.png'],
      imgName: 'sprite.png',
      retinaImgName: 'sprite@2x.png',
      cssName: '_sprite.scss',
      retinaImgPath: '../images/sprite@2x.png',
      imgPath: '../images/sprite.png',
      padding: 2
    }));
  var imgStream = spriteData.img
    .pipe(buffer())
    .pipe(gulp.dest('src/images'));
  var cssStream = spriteData.css
    .pipe(gulp.dest('src/scss'));
  return merge(imgStream, cssStream);
});

// sasssass
gulp.task('sass', function () {
  return gulp.src("src/scss/*.scss")
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(sass())
    .pipe(postcss([autoprefixer({
      browsers: [
        "IOS > 7.0",
        "Android > 4.0"
      ]
    })]))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

// pug
gulp.task('pug', function () {
  return gulp.src('src/pug/*.pug')
    .pipe(plumber())
    .pipe(changed('src', {extension: '.html'}))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest("src"))
})


// 自动刷新
gulp.task('server', ['sass', 'pug'], function () {
  browserSync({
    ui: {
      port: 3154,
      weinre: {
        port: 9090
      }
    },
    server: {
      baseDir: './src'
    }
  });
  gulp.watch("src/scss/*.scss", ['sass']);
  gulp.watch(["src/pug/*.pug", "src/pug/**/*.pug"], ['pug']);
  gulp.watch(
    [
      'src/*.html',
      'src/css/*.css',
      'src/js/*.js',
      'src/images/**/*',
      'src/iconfont/*'
    ], reload);
});

//output
var srcFolder = [
  'src/css/*.css',
  'src/js/**/*.js',
  'src/images/*.{jpg,png}',
  'src/iconfont/**',
  'src/*.html',
]