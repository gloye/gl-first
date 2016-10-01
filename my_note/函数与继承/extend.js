/**
 * 继承
 */

"user strict";

//原型链

function protoChain() {
  function Type() {
    this.type = "rubber"
  }
  Type.prototype.getType = function() {
    console.log(this.type);
  }

  function Modal() {
    this.name = "wheel"
  }

  //Modal 继承了 Type
  Modal.prototype = new Type();
  Modal.prototype.getName = function() {
    console.log(this.name)
  }
  var product = new Modal();
  product.getType();
  product.getName();
}

//借用构造函数

function consStealing() {
  function Brand() {
    this.brand = ['Michelin', 'Dunlop']
  }
  Brand.prototype.printBrand = function() {
    console.log(this.brand)
  }

  function Modal() {
    //继承了Brand
    Brand.call(this);
    this.name = "wheel";
  }
  Modal.prototype = new Brand();
  var product1 = new Modal();
  product1.brand.push('Goodyear');
  product1.printBrand();
  var product2 = new Modal();
  product2.brand.push('Giti');
  product2.printBrand();

}

//借用构造函数传参
function consStealingArg() {
  function Brand(brandName) {
    this.brand = brandName
  }
  Brand.prototype.printBrand = function() {
    console.log(this.brand)
  }

  function Modal(brandArg) {
    //继承了Brand
    Brand.call(this, brandArg);
    this.name = "wheel";
  }
  Modal.prototype = new Brand();
  var product = new Modal("Michelin");
  product.printBrand();

}

// 组合继承
function cmbInhert() {
  function Brand(name) {
    this.name = name ? name : "no name";
    this.brand = ['Michelin', 'Dunlop']
  }
  Brand.prototype.printBrand = function() {
    console.log(this.brand);
  }

  function Modal(name, size) {
    this.size = size
    Brand.call(this, name) //第二次调用Brand
  }
  Modal.prototype = new Brand(); //第一次调用Brand
  Modal.prototype.printName = function() {
    console.log(this.name);
  }
  Modal.prototype.printSize = function() {
    console.log(this.size);
  }
  var product1 = new Modal("wheel1", '16');
  product1.brand.push('Goodyear');
  var product2 = new Modal('wheel2', '18');
  product2.brand.push('Giti');

  product1.printName();
  product1.printBrand();
  product1.printSize();
  product2.printName();
  product2.printBrand();
  product2.printSize();

}

cmbInhert
//寄生组合式继承

function paraCmbInherit() {
  function Brand(name) {
    console.log('run');
    this.name = name;
    this.brand = ['Michelin', 'Dunlop']
  }
  Brand.prototype.printName = function() {
    console.log(this.name);
  }

  function Modal(name) {
    Brand.call(this, name);
  }

  function inheritPrototype(child, parent) {
    var prototype = Object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
  }
  inheritPrototype(Modal, Brand);
  var product = new Modal('wheel');
  product.printName();
}
// paraCmbInherit();