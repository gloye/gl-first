# 企业网站的快速构建方式-响应式设计介绍

## 响应式设计 (Responsive Web design)

狭义上，我们把主要依靠前端 CSS （包括 Media Query 媒体查询，百分比流式布局……）来对各种屏幕尺寸进行响应的做法，称之为响应式布局。通俗来讲，就是前端开发重构一套view界面，满足多种终端用户（PC端，PAD端，手机端）浏览该网站的需求，实现三端合一。

## 响应式布局的优势

根据其定义，我们可以了解到响应式设计的核心就是多端合一， 除此之外，他还有诸如以下特点：

- 跨平台，在手机，pad，电脑上均有不俗的表现。
- 节省人力开发成本，不再需要分派额外的人手去维护PC及移动不同终端页面
- 节约开发时间，之前需要三周开发的网站现在可能只需要一到两周。
- 表现力一致，在不同的平台上看到的东西都是基本一致的，会让感觉体验良好。
- 设计元素很容易被复用，设计成本低前端只需要维护一套CSS代码，维护成本低。
- 桌面端与移动端的设计十分接近，令用户感到“熟悉” 。

## 响应式布局的局限性

虽然响应式布局拥有如此显著的优点，但它也并不是十全十美的，在很多方面，它也有它自身的局限性：

- 自由度太低，局限性较大，这种情况就是必须兼顾移动端以及PC端的表现，比如最常见的移动端并没有hover效果，PC端就要酌情考虑了。
- 你需要考虑在手机，pad，PC上三种屏幕下的页面内元素的呈现，会导致有着非常大的局限。
- 页面会比较大，不利于加载速度，很多时候判断用户终端类型来运行不同的代码。
- 由于响应式页面是同时下载多套CSS样式，可能在手机上就下载PC/pad的冗余代码，其实毫无意义，而且浪费了流量资源。

## 响应式布局的使用领域

总结一下，响应式布局就是牺牲一小部分设计与性能来换取一套物美价廉且省时省力可以在多个终端呈现的网站视窗。因此，响应式布局的适用范围就很明确了，以内容为导向的信息展示型网站，诸如企业官网以及新闻类网站，个人博客等。一些富交互的平台类网站则不适合
做成响应式布局。

## 响应式布局的技术选型

实现响应式布局的核心是栅格系统， 这里我选两个常用的支持响应式布局的CSS框架作简单介绍

- 大名鼎鼎的Bootstrap
  Bootstrap的优点在其github仓库上这样写到，它是一个优雅，直观，强大，快速，简单构建的工具。在其[中文官网](http://v3.bootcss.com/css/#grid)上拥有详细的文档说明。
  使用方法这里不赘述，下面简述一下它的实现方式:
  - 通过设置媒体断点（@media(min-width:) and (max-width:){}）,来构建不同状态下的栅格;
  - 每种栅格有自己的命名方式（col-md-,col-lg,col-xs）,对应不同状态下的表现;
  - 栅格采用流式布局（float:left），并用百分比定义其宽度;
- 与bootstrap一时瑜亮的Foundation
  Foundaition并不像Bootstrap那样在国内中文站上有那么多的文档教程，Foundation同样支持像Bootstrap那样的流式布局栅格系统，另外，与Bootstrap4迟迟没有推出相比，Foundation6已经率先实现了使用Flex布局(伸缩布局)来实现栅格系统。

现在，使用流式布局构建响应式布局的解决方案仍旧是主流解决方案，在部分领域可能会使用到Flex方案。