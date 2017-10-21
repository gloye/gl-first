
关于前端工作流，已经有[tmt-flow](https://github.com/weixin/tmt-workflow)珠玉在前,今天介绍一下在之前项目开发过程中自己总结的一套常用的流程工具,
工作流依靠Webstorm作为IDE，有些必须的功能（文件即时编译）依赖IDE本身自带功能，并没有加到工作流中去。

## 功能特性
- 自动化流程
    + Sass -> CSS
    + CSS Autoprefixer 前缀自动补全
    + CSS 压缩 cssnano
    + CSS Sprite 雪碧图合成
    + imagemin 图片压缩
    + JS 合并压缩
    + Pug 模板语言
- 调试&部署
    + 监听文件变动，自动刷新浏览器 (LiveReload)

## 项目目录结构
```bash
Project
│  gulpfile.js                      //工作流配置文件
│  package.json
│
├─dist                     //output目录，工作流生成的所有文件
│  │  index.html
│  │
│  ├─css
│  │      all.css                   //合并后的css
│  │
│  ├─images
│  │  │  sprite.png                 //合并后的雪碧图
│  │  │
│  │  └─icons
│  ├─js
│  │      common.js                 //压缩后的脚本文件
│  │      dookay.min.js             //整合后的引用脚本
│  │
│  └─temp
├─node_moduales                     //gulp包存放目录
└─src                      //源文件目录
    │  index.html                   //IDE设置模板自动生成后的首页
    │  index.pug                    //未编译的pug模板文件
    │
    ├─bootstrap                     //引用bootstrap库，包含插件以及SCSS源文件
    │  ├─javascripts
    │  │  │  bootstrap.js
    │  │  │
    │  │  └─bootstrap
    │  │
    │  └─stylesheets
    │      │  bootstrap.scss
    │      │
    │      └─bootstrap
    │          └─mixins
    ├─css                           //存放scss源文件，插件样式，bootstrap生成样式，雪碧图sprite源scss文件
    │  │  bootstrap.css
    │  │  jquery.bxslider.css
    │  │  main.css
    │  │  main.scss
    │  │  _sprite.scss
    │  │
    │  └─images         
    │
    ├─images
    │  └─icons
    ├─js
    │      common.js              //自己的js
    │      jquery-2.2.4.min.js    //引用的js
    │
    ├─pugs                       //pug模板源文件存放目录
    │      footer.pug
    │      header.pug
    │      layout.pug
    │
    └─temp                      //存放临时图片

```
## 配置文件 Gulpfile.js

```javascript
'use strict';

//require gulp
var gulp = require('gulp');
var path = require('path');

// gulp core
var connect = require('gulp-connect');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');

//gulp support
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var buffer = require('vinyl-buffer');
var merge = require('merge-stream');

//postcss Plugin
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

//js task
gulp.task('jsinit', function () {
  return gulp.src(
      [
        "src/js/jquery-2.2.4.min.js",
        "src/bootstrap/bootstrap.js"
      ]
  )
      .pipe(concat('dookay.js'))
      .pipe(uglify())
      .pipe(rename('dookay.min.js'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task("copy", function () {
  gulp.src("src/js/common.js")
      .pipe(uglify())
      .pipe(gulp.dest("dist/js"))
})

//sass render
gulp.task('sass', function () {
  gulp.src('src/bootstrap/stylesheets/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('src/css'));
});

//jade/pug render
gulp.task("pug", function () {
  return gulp.src("src/*.pug")
      .pipe(pug({
        pretty: true
      })).pipe(
          gulp.dest("dist")
      )
})
//postcss Autopixer
gulp.task('postcss', function () {
  var processors = [
    autoprefixer, cssnano
  ];
  return gulp.src([
    "src/css/bootstrap.css",
    "src/css/main.css"
  ])
      .pipe(concat("all.css"))
      .pipe(postcss(processors))
      .pipe(gulp.dest('dist/css'));
});

//spriteSmith
gulp.task('sprite', function () {
  var spriteData = gulp.src('src/images/icons/*.png')
      .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        padding: 2,
        imgPath: '../images/sprite.png'
      }))
  var imgStream = spriteData.img
      .pipe(buffer())
      .pipe(imagemin())
      .pipe(gulp.dest('src/images'));
  var cssStream = spriteData.css
      .pipe(gulp.dest('src/css'));
  return merge(imgStream, cssStream);
})

//Server
gulp.task('connect', function () {
  connect.server({
    root: ".",
    livereload: true,
    port: 3100
  })
});

//watch Task
gulp.task('html', function () {
  gulp.src('src/*.html')
      .pipe(connect.reload());
});
gulp.task('css', function () {
  gulp.src('src/css/*.css')
      .pipe(connect.reload());
});
gulp.task('js', function () {
  gulp.src('src/js/*.js')
      .pipe(connect.reload());
});
gulp.task('watch', function () {
  gulp.watch(['src/*.html'], ['html']),
      gulp.watch(['src/css/*.css'], ['css']),
      gulp.watch(['src/js/*.js'], ['js'])
});

//image Task
gulp.task('images', function () {
  gulp.src('src/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/images'));
});

gulp.task('temp', function () {
  gulp.src('src/temp/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/temp'));
});

// default-task
gulp.task('server', ['connect', 'watch']);

//gulp image
gulp.task("image", ["images", "temp"]);

//gulp output
gulp.task(
    "output",
    [
      "pug"
      , "postcss"
      ,"jsinit"
      ,"copy"
      ,"image"
    ]);

```

## 运行方式

+ 执行gulp server任务开启服务器，实现即时监听即时刷新
+ 执行output任务执行打包，一次生成dist文件
+ 执行单个任务可分别实现不同功能

## 下载地址

依赖node环境，解压在项目文件夹下使用  
[百度网盘](http://pan.baidu.com/s/1pLq5zWR)