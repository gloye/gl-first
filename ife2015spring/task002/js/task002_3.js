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
function extend(target,source){
  for (var key in source){
    if(source.hasOwnProperty(key)){
      target[key] = source [key];
    }
  }
  return target;
}
//绑定环境
function bind(fn,context){
  var args = [].slice.call(arguments,2);
  return function(){
    args = args.concat([].slice.call(arguments));
    return fn.applay(context,args);
  };
}
//继承
function inherits(subClass,superClass){
  var proto = subClass.prototype;
  var F = function(){};
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  extend(subClass.prototype,proto);
  return subClass;
}
// 判断元素的包含关系
function contains(node1, node2) {
  if (node1 === node2) {
    return false;
  }
  if (node1.contains) {
    return node1.contains(node2);
  }
  return !!(node1.compareDocumentPosition(node2) & 16);
}
