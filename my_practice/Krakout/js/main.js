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
    if (o.xAxis <= 0) {
      o.xAxis = 0
      return
    }
    o.xAxis -= o.speed
  }
  o.moveRight = function () {
    if (o.xAxis >= 800) {
      o.xAxis = 800
      return
    }
    o.xAxis += o.speed
  }
  o.collide = function (ball) {
    if (ball.yAxis + ball.image.height > o.yAxis) {
      if (ball.xAxis > o.xAxis && ball.x < o.xAxis + o.image.width) {
        log('相撞')
        return true
      }
    }
    return false
  }
  return o
}

const Ball = function () {
  const image = imageFromPath('../images/ball.png')
  const o = {
    image: image,
    xAxis: 0,
    yAxis: 20,
    speedX: 10,
    speedY: 10,
    fired: false
  }
  o.fire = function () {
    o.fired = true
  }
  o.move = function () {
    if (o.fired) {
      if (o.xAxis < 0 || o.xAxis > 1000) {
        o.speedX = -o.speedX
      }
      if (o.yAxis < 0 || o.yAxis > 500) {
        o.speedY = -o.speedY
      }
      // move
      o.xAxis += o.speedX
      o.yAxis += o.speedY
    }
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
    g.update()
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
  const ball = Ball()
  const game = Game()
  game.registerAction('a', function () {
    paddle.moveLeft()
  })
  game.registerAction('d', function () {
    paddle.moveRight()
  })
  game.registerAction('f', function () {
    ball.fire()
  })
  game.update = function () {
    ball.move()
    // 判断相撞
    if (paddle.collide(ball)) {
      // 这里应该调用一个 ball.反弹() 来实现
      ball.speedY *= -1
    }
  }
  game.draw = function () {
    game.drawImage(paddle)
    game.drawImage(ball)
  }
}
__main()
