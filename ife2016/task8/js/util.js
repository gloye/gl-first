/**
 * Created by admin on 2016/3/11.
 */
window.onload = function () {

  // Ϊelement����һ����ʽ��ΪnewClassName������ʽ
  /*  function addClass(element, newClassName) {
   var $ = document.querySelectorAll(element);
   for(var i=0;i< $.length;i++){
   $[i].classList.add(newClassName);
   }
   }
   addClass("div","box");*/


// �Ƴ�element�е���ʽoldClassName
  /*  function removeClass(element, oldClassName) {
   var $ = document.querySelectorAll(element);
   for (var i = 0; i < $.length; i++) {
   $[i].classList.remove(oldClassName);
   }
   }
   removeClass("div", "box");*/


// �ж�siblingNode��element�Ƿ�Ϊͬһ����Ԫ���µ�ͬһ����Ԫ�أ�����boolֵ
  /*  function isSiblingNode(element, siblingNode) {
   var par1 = document.querySelector(element).parentNode;
   var par2 = document.querySelector(siblingNode).parentNode;
   if (par1 == par2) {
   return true;
   }
   }
   isSiblingNode(".box1", ".box3");*/


// ��ȡelement�������������ڵ�λ�ã�����һ������{x, y}
  /*  function getPosition(element) {
   var offset = {};
   var ele = document.querySelector(element);
   offset.x = ele.offsetLeft;
   offset.y = ele.offsetTop;
   return offset;
   }
   console.log(getPosition(".box3"));*/


  // ʵ��һ���򵥵�Query ,����ͨ���򵥵������߲�ѯ����
  function $(selector) {
    return document.querySelector(selector);
  }

// ��һ��element��һ�����event�¼�����Ӧ����Ӧ����Ϊlistener
  function addEvent(element, event, listener) {
    element.addEventListener(event,listener);
  }

// ���磺
  function a(event) {
    console.log("this is a " + event.type + " event");
  }

  addEvent($("#btn"), "click", a);

// �Ƴ�element�������event�¼�����ʱִ��listener����Ӧ
  function removeEvent(element, event, listener) {
    // your implement
  }

};