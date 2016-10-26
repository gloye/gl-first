之前拿到的一个设计稿，时间轴设计得很有意思。首先，他是长这个样子的
（此处应有图片），采用水平方向设计，在垂直方向上节省了空间，并采用了
多种配色，使之表现更加鲜明活泼等等，当然此处不再赘述设计上的理念，单从
前端切图的角度来看，如何去实现其原本的设计，也就是还原设计稿。  
## 1.开始位置
通过测量可知，时间轴中轴线在整个板块区间垂直居中，每一小块内容区上下
错落分布，宽度则均为200px,左右没有间隙，内容的起始位置并没有在屏幕的最左边
(对大屏幕而言),而是在其container的开始位置。

```css
.container{
  width:1200px;
  margin-left:auto;
  margin-right:auto;
}
```


这时候我们可能会想把内容写在container的里面

```html
<div id="wrapper">
    <div class="container">
        <div class="timeline-wrapper"></div> /*时间轴包裹容器*/
    </div>     
</div>
 ```   

 这样会带来另一个问题，内容会在超出container宽度以后换行，怎么解决这个问题呢，我们
 要让我们的*timeline-wrapper*从标准文档流中解放出来，不让它受到宽度的束缚，我们为其
 定义一个*position:absolute*的属性，当然，根据绝对定位（absolute）根据父级定位元素
 的初始位置进行定位的特性来讲，我们必须给予*container*一个定位属性也就是相对定位*position:relative*
 否则，它只能基于祖先元素也就是文档的初始位置进行定位了，这样做虽然能够解决当前问题，
 但是，有没有优化的方式呢，我们能不能不依靠*container*直接让*timeline-wrapper*居中呢，
 好的，下面就是  
 **TIP1：利用绝对定位实现元素在文档中的定位**  

 ```css
 #wrapper{
   position:relative;
 }
 .timeline-wrapper{
   position:absolute;
   left:50%;
   margin-left:-600px;
 }
 ```

如果我们已知绝对定位元素的宽度，我们就可以将上面的代码稍作修改*margin-left:width/2*来实现元素的水平居中

## 2.年份圆形的位置

现在开始划分内容，这里我把每一年份划分成一块，即**timeline-item**，每一块中我又把年份分成一块**heading**
,内容分成另一块**body**,所以现在看起来是这样的。
```html
<div id="wrapper">
  <div class="timeline-wrapper">
    <section class="timeline-item">
      <div class="heading">2016</div>
      <div class="body">2016年发生了...</div>
    </section>
  </div>
</div>
```
这里年份在垂直方向上居中，然后每一块内容区的高度并不一致，所以我们给**.body**设置一个**absolute**,
再给**timeline-item**一个**relative**属性，这样**timeline-item**的高度就等于**.heading**的高度，
根据tip1，这里有

```css
.timeline-item{
  position:relative;
  top:50%;
  margin-top:???; /*-(heading高度/2)*/
}
```
这里**heading**高度我们固然可以测出来，但是万一有改动呢，我们每次都要修改**margin-top**值吗，不尽然，
我们可以利用css3的transform属性

**TIP2：利用transform实现垂直居中**  

```css
.timeline-item{
  position:relative;
  top:50%;
  transform:translateY(-50%);
}
```

由于transform百分比计算的是元素本身，我们并不需要知道元素自身的尺寸，**transform:translate(-50%,-50%)**
通常配合定位实现未知尺寸元素的水平垂直居中。
 