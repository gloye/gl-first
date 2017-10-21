const traffic = document.querySelector("#traffic");
function start(traffic, stateList) {
  var currentStateIndex = 0;

  setInterval(function () {
    var state = stateList[currentStateIndex];
    traffic.className = state;
    currentStateIndex = (currentStateIndex + 1) % stateList.length;
  }, 2000);
}

//过程抽象的过程
function poll(...fnList) {
  let stateIndex = 0;

  return function (...args) {
    let fn = fnList[stateIndex++ % fnList.length];
    return fn.apply(this, args);
  }
}

function setState(state) {
  traffic.className = state;
}

let trafficStatePoll = poll(setState.bind(null, "wait"),
  setState.bind(null, "stop"),
  setState.bind(null, "pass"));

setInterval(trafficStatePoll, 2000);   