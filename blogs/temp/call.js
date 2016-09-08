function greet(i) {
  if (typeof i === 'object')
    var reply = [i.person, ' Is An Awesome ', i.role].join('');
  console.log(reply);
}
var i = {
  person: 'Douglas Crockford',
  role: 'Javascript Developer'
};

// greet(i);

/*apply方法*/
function sum(n1, n2) {
  this.name = "sum";
  console.log(this.name);
  return n1 + n2;
}

function callsum1(n1, n2) {
  this.name = "callsum1";
  return sum.apply(callsum1, arguments);

}

console.log(callsum1(10, 20));