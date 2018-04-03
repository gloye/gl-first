var gulp = require("gulp");
var browserSync = require("browser-sync");
var plumber = require("gulp-plumber");
var reload = browserSync.reload;

//spritesmith
var spritesmith = require("gulp.spritesmith");
var buffer = require("vinyl-buffer");
var merge = require("merge-stream");

//sass
var sass = require("gulp-sass");

//postcss
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano")

//pug
var changed = require("gulp-changed");
var pug = require("gulp-pug");

//imagemin
var imagemin = require("gulp-imagemin");

//utils
function handleError(err) {
  console.log(err.toString());
  this.emit("end");
}

//fs
var fs = require("fs-extra");

// 雪碧图
gulp.task("sprite", function() {
  var spriteData = gulp.src("src/images/icons/*.png").pipe(
    spritesmith({
      retinaSrcFilter: ["src/images/icons/*@2x.png"],
      imgName: "sprite.png",
      retinaImgName: "sprite@2x.png",
      cssName: "_sprite.scss",
      retinaImgPath: "../images/sprite@2x.png",
      imgPath: "../images/sprite.png",
      padding: 2
    })
  );
  var imgStream = spriteData.img.pipe(buffer()).pipe(gulp.dest("src/images"));
  var cssStream = spriteData.css.pipe(gulp.dest("src/scss"));
  return merge(imgStream, cssStream);
});

// sass
gulp.task("sass", function() {
  return gulp
    .src("src/scss/*.scss")
    .pipe(
      plumber({
        errorHandler: handleError
      })
    )
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

// pug
gulp.task("pug", function() {
  return gulp
    .src("src/pug/*.pug")
    .pipe(plumber())
    .pipe(changed("src", { extension: ".html" }))
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("src"));
});

// 自动刷新 dev模式
gulp.task("dev", ["sass", "pug"], function() {
  browserSync({
    ui: {
      port: 3154,
      weinre: {
        port: 9090
      }
    },
    server: {
      baseDir: "./src"
    }
  });
  gulp.watch("src/scss/*.scss", ["sass"]);
  gulp.watch(["src/pug/*.pug", "src/pug/**/*.pug"], ["pug"]);
  gulp.watch(
    [
      "src/*.html",
      "src/css/*.css",
      "src/js/*.js",
      "src/images/**/*",
      "src/iconfont/*"
    ],
    reload
  );
});

// 压缩图片
gulp.task("imagemin", function() {
  gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});

// 移动HTML以及css
gulp.task("copy", function() {
  gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

// clean 清理模式
gulp.task("clean", function() {
  fs.remove("dist");
});

// postcss处理
gulp.task("postcss", function() {
  var plugins = [
      autoprefixer({
        browsers: ["IOS > 7.0", "Android > 4.0.0"]
      }),
      cssnano()
  ]
  gulp
    .src("src/css/*.css")
    .pipe(
      postcss(plugins)
    )
    .pipe(gulp.dest("dist/css"));
});

// production 模式
gulp.task(
  "build",
  [
    "clean", // 清理文件
    "copy", // 复制html文件
    'postcss' , // css处理
    "imagemin" // 压缩图片
  ],
  function() {}
);

//output
var srcFolder = [
  "src/css/*.css",
  "src/js/**/*.js",
  "src/images/*.{jpg,png}",
  "src/iconfont/**",
  "src/*.html"
];
