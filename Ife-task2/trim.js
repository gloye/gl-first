//trim方法与正则
if(typeof String.trim=="undefined"){
    String.prototype.trim=function(){
        return this.replace(/(^\s*)|(\s*$)/g,"");
    };
}
//    ^  匹配输入的开始
//    \s 匹配一个单个的空白字符
//    *  匹配0次或多次
//    $  匹配输入的结束
//    g  对整个字符串都使用该匹配