/**
 * Created by admin on 2016/3/16.
 */

//test if a Array
function isArry(arr) {
  return Array.isArray(arr);
};

// test if a Function
function isFunction(fn) {
  if (typeof fn == "function") {
    return true;
  } else {
    return false;
  }
};

// deep extend
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


// unique a Array
function uniqArray(arr) {
  var newArr = [], newObj = {};
  for (var i in arr) {
    if (newObj[arr[i]] == undefined && arr[i].length>0) {
      newObj[arr[i]] = true;
      newArr.push(arr[i]);
    }
  }
  return newArr;
}


// trim
function trim(str) {
  return str.trim();
}

// each Method
function each(arr, fn) {
  for (var i in arr) {
    fn(arr[i], i);
  }
}

// getLenth
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
  } else if (document.querySelectorAll(element).length > 1){
    return document.querySelectorAll(element)
  }else{
    return false;
  }
}
function addEvent(element, event, listener) {
  $(element).addEventListener(event, listener);
}
function removeEvent(element, event, listener) {
  $(element).removeEventListener(event, listener);
}
$.on = function(element,event,listener){
  addEvent(element,event,listener);
};
$.un=function(element,event,listener){
  removeEvent(element,event,listener);
};
