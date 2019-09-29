class Game {
    constructor () {
        this.canvas = document.getElementById("pong");
        this.screen = this.canvas.getContext("2d");
        this.rightPressed = false;
        this.leftPressed = false;
        this.gameOver = false;
        this.bodies = [];

        this.player = new Player(this)
        this.addBody(this.player)

        this.ball = new Ball(this)
        this.addBody(this.ball)
    }
      
    addBody (body) {
        this.bodies.push(body)
    }

    update (){
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
        this.y = game.canvas.height-30;
        this.xVelocity = 2;
        this.yVelocity = -2;
    }
    draw() {
        game.screen.beginPath();
        game.screen.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        game.screen.fillStyle = "white";
        game.screen.fill();
        game.screen.closePath();
    }
    update(){
        console.log("updated")
    }
}

class Player{
    constructor(game) {
        this.paddleHeight = 10;
        this.paddleWidth = 75;
        this.paddleX = (game.canvas.width-this.paddleWidth)/2;
    }
    draw() {
        game.screen.beginPath();
        game.screen.rect(this.paddleX, game.canvas.height-this.paddleHeight, this.paddleWidth, this.paddleHeight);
        game.screen.fillStyle = "black";
        game.screen.fill();
        game.screen.closePath();
    }

    update(){
        console.log("updated")
    }
}

const game = new Game('pong')
game.run()
