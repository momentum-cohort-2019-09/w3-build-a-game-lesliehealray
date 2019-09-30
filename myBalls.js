class Game {
    constructor () {
        this.canvas = document.getElementById("myBalls");
        this.screen = this.canvas.getContext("2d");
        this.gameOver = false;
        this.bodies = [];
        this.elapsedTime = 0;
        this.playerScore = 0;
        this.computerScore = 0;
        this.keyboard = new Keyboarder();

        this.player = new Player(this);
        this.addBody(this.player);

        this.ball = new Ball(this);
        this.addBody(this.ball);
    }
      
    addBody (body) {
        this.bodies.push(body);
    }

    removeBody (body) {
        function arrayRemove(arr, value) {
            return arr.filter(function(ele){
                return ele.uuid != value;
            });
        }
        this.bodies = arrayRemove(this.bodies, body.uuid);
        this.setGameStatus();
    }

    update (){
        this.elapsedTime += 1
        //add ball about 1 every 2 seconds
        if (this.elapsedTime % 130 === 0){
            let ball = new Ball(this);
            this.addBody(ball);
        }
        for (let body of this.bodies) {
            body.update(this);
            if (colliding(this.player, body)) {
                body.xVelocity *= -1
                body.yVelocity *= -1
                if (body.ballRadius > 0) {
                    body.ballRadius -= 5
                }
            }
        } 
            
    }

    draw () {
        this.screen.fillStyle = "pink";
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

    setGameStatus(){
        if (this.computerScore >= 99){
            this.gameOver = true;
        }    
    }
}


class Ball{
    constructor(game) {
        this.uuid = this.createUUID()
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
        if (this.ballRadius === 0){
            game.playerScore += 1;
            document.getElementById('player-score').innerHTML = game.playerScore;
            game.removeBody(this)
        } else {
            if(this.x + this.xVelocity > game.canvas.width-this.ballRadius || this.x + this.xVelocity < this.ballRadius) {
                this.xVelocity = -this.xVelocity;
                game.computerScore += 1;
                document.getElementById('computer-score').innerHTML = game.computerScore

            }
        
            else if (this.y + this.yVelocity > game.canvas.height - this.ballRadius || this.y + this.yVelocity< this.ballRadius){
                this.yVelocity = -this.yVelocity;
                game.computerScore += 1
                document.getElementById('computer-score').innerHTML = game.computerScore

            }
            this.x += this.xVelocity;
            this.y += this.yVelocity;
        } 
    }
    createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
}

class Player{
    constructor(game) {
        this.paddleHeight = 20;
        this.paddleWidth = 20;
        this.paddleX = (game.canvas.width-this.paddleWidth)/2;
        this.paddleY = (game.canvas.height - this.paddleHeight)
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
            this.paddleX -= 10;
        } else if (game.keyboard.isDown(Keyboarder.KEYS.RIGHT) && this.paddleX < game.canvas.width-this.paddleWidth){
            this.paddleX += 10;
        } else if (game.keyboard.isDown(Keyboarder.KEYS.DOWN) && this.paddleY < game.canvas.height-this.paddleHeight){
            this.paddleY +=10;
        } else if (game.keyboard.isDown(Keyboarder.KEYS.UP) && (this.paddleY < game.canvas.height && this.paddleY > 0) ) {
            this.paddleY -= 10;
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



function colliding(player, ball){
    var distX = Math.abs(ball.x - player.paddleX-player.paddleWidth/2);
    var distY = Math.abs(ball.y - player.paddleY-player.paddleHeight/2);

    if (distX > (player.paddleWidth/2 + ball.ballRadius)) { return false; }
    if (distY > (player.paddleHeight/2 + ball.ballRadius)) { return false; }

    if (distX <= (player.paddleWidth/2)) { return true; } 
    if (distY <= (player.paddleHeight/2)) { return true; }

    var dx=distX-player.paddleWidth/2;
    var dy=distY-player.paddleHeight/2;
    return (dx*dx+dy*dy<=(ball.ballRadius*ball.ballRadius));
}
  
  Keyboarder.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, S: 83 }


const game = new Game('myBalls')
game.run()
