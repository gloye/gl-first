'user strict'
// javascript高级程序设计 第六章、第七章实践

var print = document.getElementById('print')

// 工厂模式
function Factory () {
  function fn (name, size) {
    var modal = {}
    modal.name = name
    modal.size = size
    modal.printName = function () {
      console.log(modal.name)
    }

    return modal
  }
  var product = fn('wheel', '18')
  product.printName()
}
// Factory()

// 构造函数模式
function Constructor () {
  function fn (name, size) {
    this.name = name
    this.size = size
    this.printName = function () {
      console.log(this.name)
    }
  }
  var product = new fn('wheel', '18')
  product.printName()
}

// 原型模式

function PrototypeFn () {
  function fn () {
  }
  fn.prototype.name = 'name'
  fn.prototype.size = 'size'
  fn.prototype.printName = function () {
    console.log(fn.prototype.name)
  }
  var productA = new fn()
  productA.name = 'nameA'
  var productB = new fn()
  productA.name = 'nameB'
}

// 组合使用构造函数与原型模式

function comConsProto () {
  function fn (name, size) {
    this.name = name
    this.size = size
  }

  fn.prototype.printName = function () {
    console.log(this.name)
  }
  var productA = new fn(['wheelA'], '12')
  var productB = new fn(['wheelB'], '14')
  productA.name.push('wheelA1')
  productA.printName()
  productB.printName()
}

// 动态原型模式
function DymPrototype () {
  function fn (name, size) {
    this.name = name
    this.size = size
    // 加上流程控制的意思是为了避免重写原型方法，也就是说实例在没有定义printName()时才会执行
    if (typeof this.printName != 'function') {
      fn.prototype.printName = function () {
        console.log(this.name)
      }
    }
  }
  var product = new fn('wheel', '14')
  product.printName()
}

// 寄生构造函数

function ParaCons () {
  function fn (name, size) {
    /*  var modal = {}
      modal.name = name
      modal.size = size
      modal.printName = function () {
        console.log(modal.name)
      }
      return modal*/
    this.name = name
    this.size = size
    this.printName = function () {
      console.log(this.name.join(','))
    }
  }
  var product = new fn(['wheelA', 'wheelB', 'wheelC'], '18')
  product.printName()
}

// 稳妥构造函数模式

function safeCons () {
  function fn (name) {
    var modal = {}
    modal.printName = function () {
      console.log(name)
    }
    return modal
  }
  var product = new fn('wheel')
  product.printName();
}

safeCons()
