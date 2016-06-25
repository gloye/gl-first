function slider(selector) {
  //小圆点
  var pagers = document.createElement("div");
  pagers.setAttribute('id','pagers');
  var pagerItem = document.createElement('a');
  pagerItem.setAttribute('href','javacript:;');
  //防止重绘DOM树
  var frag = document.createDocumentFragment();
  frag.appendChild(pagers);
  for(var i=0;i<len;i++){
    pagers.appendChild(pagerItem.cloneNode(true));
  }
  $('#wrapper').appendChild(frag);
}
//实现一个复制

//绑定环境

//继承
