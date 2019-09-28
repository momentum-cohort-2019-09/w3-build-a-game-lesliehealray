Class Game {
    constructor(){
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
        let gameSize = {x: canvas.width, y: canvas.height}
        
        this.gameBodies = []
        this.gameBodies = this.gameBodies.concat(new Player(this, gameSize))

        let tick = () => {
            this.update()
            this.draw(ctx, gameSize)
            requestAnimationFrame(tick)
        }
        tick()
    }
    update() {

    }

}