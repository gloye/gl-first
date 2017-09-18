// 继承

function SuperFoo() {
    this.superName = ["super"]
}

SuperFoo.prototype.saySuperName = function () {
    console.log(this.superName);
}

function SubFoo() {
    this.subName = ["sub"];
    SuperFoo.call(this);
}

SubFoo.prototype = new SuperFoo();
SubFoo.prototype.saySubName = function () {
    console.log(this.subName);
}

var instance = new SubFoo();
instance.superName.push('ccc');

var instance2 = new SubFoo();

console.log(SubFoo.superName,SubFoo.prototype.superName)

debugger;