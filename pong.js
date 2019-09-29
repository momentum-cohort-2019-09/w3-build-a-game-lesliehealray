class Game {
    constructor () {
        this.canvas = document.getElementById("pong");
        this.screen = this.canvas.getContext("2d");
        this.rightPressed = false;
        this.leftPressed = false;
        this.gameOver = false;
        this.bodies = [];
        this.elapsedTime = 0;
        this.keyboard = new Keyboarder()

        this.player = new Player(this)
        this.addBody(this.player)

        this.ball = new Ball(this)
        this.addBody(this.ball)
    }
      
    addBody (body) {
        this.bodies.push(body)
    }

    update (){
        this.elapsedTime += 1
        if (this.elapsedTime % 120 === 0){
            let ball = new Ball(this)
            this.addBody(ball)
        }
        for (let body of this.bodies) {
            body.update(this)
        }
    }

    draw () {
        this.screen.fillStyle = "grey";
        this.screen.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (let body of this.bodies) {
          body.draw(this.screen)
        }
    }

    run () {
    const tick = () => {
        this.update()
        this.draw()

        if (!this.gameOver) {
        window.requestAnimationFrame(tick)
        }
    }

    tick()
    }
}


class Ball{
    constructor(game) {
        this.ballRadius = 10;
        this.x = game.canvas.width/2;
        this.y = game.canvas.height/2;
        let x_rand = 1 + Math.floor(Math.random() * Math.floor(3));
        x_rand *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
        this.xVelocity = x_rand;
        let y_rand = 1 + Math.floor(Math.random() * Math.floor(3));
        y_rand *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
        this.yVelocity = y_rand;
    }
    draw() {
        game.screen.beginPath();
        game.screen.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        game.screen.fillStyle = "white";
        game.screen.fill();
        game.screen.closePath();
    }
    update(){
        if(this.x + this.xVelocity > game.canvas.width-this.ballRadius || this.x + this.xVelocity < this.ballRadius) {
            this.xVelocity = -this.xVelocity;
        }
       
        else if (this.y + this.yVelocity > game.canvas.height - this.ballRadius || this.y + this.yVelocity< this.ballRadius){
            this.yVelocity = -this.yVelocity;
        }
        // else if(this.y + this.yVelocity > game.canvas.height-this.ballRadius) {
        //     // if(this.x > game.paddleX && this.x < game.paddleX + game.paddleWidth) {
        //         this.yVelocity = -this.yVelocity;
        //     // }
        // }
        this.x += this.xVelocity;
        this.y += this.yVelocity;
    }
}

class Player{
    constructor(game) {
        this.paddleHeight = 20;
        this.paddleWidth = 20;
        this.paddleX = (game.canvas.width-this.paddleWidth)/2;
        this.paddleY = (game.canvas.height)
    }
    draw() {
        game.screen.beginPath();
        game.screen.rect(this.paddleX, this.paddleY, this.paddleWidth, this.paddleHeight);
        game.screen.fillStyle = "black";
        game.screen.fill();
        game.screen.closePath();
    }

    update(){
        if (game.keyboard.isDown(Keyboarder.KEYS.LEFT) && this.paddleX > 0) {
            this.paddleX -= 7;
        } else if (game.keyboard.isDown(Keyboarder.KEYS.RIGHT) && this.paddleX < game.canvas.width-this.paddleWidth){
            this.paddleX += 7;
        } else if (game.keyboard.isDown(Keyboarder.KEYS.UP) && this.paddleY < game.canvas.height-this.paddleHeight){
            this.paddleY +=7;
            console.log('UP')
        } else if (game.keyboard.isDown(Keyboarder.KEYS.DOWN) && this.paddleY > 0){
            this.paddleY -= 7;
            console.log('DOWN')

        }
    }   
}

  
class Keyboarder {
    constructor () {
      this.keyState = {}
  
      document.addEventListener('keydown', function (e) {
        this.keyState[e.keyCode] = true
      }.bind(this))
  
      document.addEventListener('keyup', function (e) {
        this.keyState[e.keyCode] = false
      }.bind(this))
    }
  
    isDown (keyCode) {
      return this.keyState[keyCode] === true
    }
  
    on (keyCode, callback) {
      document.addEventListener('keydown', function (e) {
        if (e.keyCode === keyCode) {
          callback()
        }
      })
    }
  }
  
  Keyboarder.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, S: 83 }


const game = new Game('pong')
game.run()
