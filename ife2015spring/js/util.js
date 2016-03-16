/**
 * Created by admin on 2016/3/16.
 */

// �ж�arr�Ƿ�Ϊһ�����飬����һ��boolֵ
function isArry(arr) {
  return Array.isArray(arr);
};

// �ж�fn�Ƿ�Ϊһ������������һ��boolֵ
function isFunction(fn) {
  if (typeof fn == "function") {
    return true;
  } else {
    return false;
  }
};

// ʹ�õݹ���ʵ��һ����ȿ�¡�����Ը���һ��Ŀ����󣬷���һ����������
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


// ���������ȥ�ز�����ֻ����������Ԫ��Ϊ���ֻ��ַ���������һ��ȥ�غ������
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


// ���ַ���ͷβ���пո��ַ���ȥ��������ȫ�ǰ�ǿո�Tab�ȣ�����һ���ַ���
function trim(str) {
  return str.trim();
}

// ʵ��һ����������ķ��������������ÿһ��Ԫ��ִ��fn��������������������Ԫ����Ϊ��������
function each(arr, fn) {
  for (var i in arr) {
    fn(arr[i], i);
  }
}

// ��ȡһ�����������һ��Ԫ�ص�����������һ������
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