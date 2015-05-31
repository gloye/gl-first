//数组去重实例,根据网上实例自己尝试一下
//方法1，比较常规的方法
//step 1 构建一个新数组
//step 2 for循环每次从原数组中取出一个元素，用这个元素循环与结果数组对比
//step 3 如果结果数组中没有该元素,则保存到结果数组中去
var ary1 = [1, 3, 3, 5, 7];
var ary2 = [];
Array.prototype.unique1 = function () {
	var ary2 = [this[0]];
	for (var i = 1; i < this.length; i++) {
		var repeat = false;
		for (var j = 0; j < ary2.length; j++) {
			if (this[i] == ary2[j]) {
				repeat = true;
				break;
			}
		}
		if (!repeat) {
			ary2.push(this[i]);
		}
	}
	return ary2;
};
console.log(ary1);
console.log(ary1.unique1());
//方法2，效率高一点的方法
/* 1.先将原数组进行排序
2.检查原数组中的第i个元素 与 结果数组中的最后一个元素是否相同，因为已经排序，所以重复元素会在相邻位置
3.如果不相同，则将该元素存入结果数组中*/
Array.prototype.unique2 = function(){
	this.sort();	//先排序
	var res = [this[0]];
	for(var i = 1; i < this.length; i++){
		if(this[i] !== res[res.length - 1]){
			res.push(this[i]);
		}
	}
	return res;
};
var arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0]
console.log(arr.unique2());
//第二种方法也会有一定的局限性，因为在去重前进行了排序，所以最后返回的去重结果也是排序后的。如果要求不改变数组的顺序去重，那这种方法便不可取了。
/*第三种方法（推荐使用）

思路：

1.创建一个新的数组存放结果

2.创建一个空对象

3.for循环时，每次取出一个元素与对象进行对比，如果这个元素不重复，则把它存放到结果数组中，同时把这个元素的内容作为对象的一个属性，并赋值为1，存入到第2步建立的对象中。

说明：至于如何对比，就是每次从原数组中取出一个元素，然后到对象中去访问这个属性，如果能访问到值，则说明重复。*/

Array.prototype.unique3 = function(){
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++){
		if(!json[this[i]]){
			console.log(json);
			res.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return res;
};

var arr = [112,112,34,'你好',112,112,34,'你好','str','str1'];
console.log(arr.unique3());