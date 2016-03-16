/**
 * Created by admin on 2016/3/16.
 */

// 判断arr是否为一个数组，返回一个bool值
function isArry(arr) {
  return Array.isArray(arr);
};

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
  if (typeof fn == "function") {
    return true;
  } else {
    return false;
  }
};

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
function cloneObject(src) {
  var newObj = Array.isArray(src) ? [] : {};
  for (var i in src) {
    if (typeof src[i] == "object") {
      newObj[i] = cloneObject(src[i])
    } else {
      newObj[i] = src[i];
    }
  }
  return newObj;
}


// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
  var newArr = [], newObj = {};
  for (var i in arr) {
    if (newObj[arr[i]] == undefined) {
      newObj[arr[i]] = true;
      newArr.push(arr[i]);
    }
  }
  return newArr;
}


// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
function trim(str) {
  return str.trim();
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
  for (var i in arr) {
    fn(arr[i], i);
  }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
  var lenArr = [];
  for (var i in obj) {
    lenArr.push(obj[i]);
  }
  return lenArr.length;
}


function $(element) {
  if (element.nodeType == 1) {
    return this;
  } else if (document.querySelectorAll(element).length == 1) {
    return document.querySelector(element)
  } else {
    return document.querySelectorAll(element)
  }
}
function addEvent(element, event, listener) {
  element.addEventListener(event, listener);
}
function removeEvent(element, event, listener) {
  element.removeEventListener(event, listener);
}