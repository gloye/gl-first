const imageFromPath = function (path) {
  const img = new window.Image()
  img.src = path
  return img
}

const Paddle = function () {
  const image = imageFromPath('../images/1.png')
  const o = {
    image: image,
    xAxis: 0,
    yAxis: 420,
    speed: 20
  }
  o.moveLeft = function () {
    o.xAxis -= o.speed
  }
  o.moveRight = function () {
    o.xAxis += o.speed
  }
  return o
}

const Game = function () {
  const Canvas = document.getElementById('demo')
  const Context = Canvas.getContext('2d')
  const g = {
    canvas: Canvas,
    cxt: Context,
    actions: {},
    keydowns: {}
  }
  // clear
  g.clear = function () {
    g.cxt.clearRect(0, 0, Canvas.width, Canvas.height)
  }
  // draw
  g.draw = function (img, xAxis, yAxis) {
    g.cxt.drawImage(img, xAxis, yAxis)
  }
  // drawImage
  g.drawImage = function (img) {
    g.cxt.drawImage(img.image, img.xAxis, img.yAxis)
  }
  // timer
  setInterval(function () {
    // update
    const keys = Object.keys(g.actions)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (g.keydowns[key]) {
        g.actions[key]()
      }
    }
    g.clear()
    g.draw()
  }, 1000 / 30)

  // events
  g.registerAction = function (key, callback) {
    g.actions[key] = callback
  }

  window.addEventListener('keydown', function (e) {
    g.keydowns[e.key] = true
  })

  window.addEventListener('keyup', function (e) {
    g.keydowns[e.key] = false
  })

  return g
}

const log = console.log.bind(console)
const __main = function () {
  const paddle = Paddle()
  const game = Game()
  game.registerAction('a', function () {
    paddle.moveLeft()
  })
  game.registerAction('d', function () {
    paddle.moveRight()
  })
  game.draw = function () {
    game.drawImage(paddle)
  }
}
__main()
