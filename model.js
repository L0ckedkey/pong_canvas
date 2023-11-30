import { canvasHeight, canvasWidth } from "./config.js"

export class Paddle{
    constructor({position, speed, color, id, size, c}){
        this.position = {
            x: position.x,
            y: position.y
        }
        this.speed = speed
        this.width = size.width,
        this.height = size.height
        this.color = color,
        this.id = id,
        this.c = c
    }

    checkCollideBorder(){
        if(this.position.x + this.height > canvasWidth || this.position.x < 1){
            return true
        }

        return false
    }

    render(){
        this.c.fillStyle = this.color
        this.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    checkCollision(direction){
        if(this.position.y - this.speed < 0 && direction === 'up'){
            return true
        }

        if(this.position.y + this.speed + this.height > canvasHeight && direction === 'down'){
            return true
        }

        return false
    }

    move(direction){
        if(!this.checkCollision(direction)){
            if(direction === 'up'){
                this.position.y -= this.speed;
            }
    
            if(direction === 'down'){
                this.position.y += this.speed;
            }
        }
    }

}

export class Ball{
    constructor({position, velocity, color, id, size, c}){
        this.position = {
            x: position.x,
            y: position.y
        }
        this.velocity = {
            x: velocity.x,
            y: velocity.y
        }
        this.radius = size.radius
        this.color = color,
        this.id = id
        this.c = c
    }

    checkBallPoint(){
        if(this.position.x + this.radius + this.velocity.x > canvasWidth){
            console.log("Green Win")
            return
        }

        if(this.position.x + this.velocity.x < 0){
            console.log("Red Win")
            return
        }
    }

    checkCollision(){
        if(this.position.y + this.velocity.y < 0){
            this.velocity.y *= -1
        }

        if(this.position.x + this.velocity.x < 0){
            this.velocity.x *= -1
        }

        if(this.position.x + this.radius + this.velocity.x > canvasWidth){
            this.velocity.x *= -1
        }

        if(this.position.y + this.radius + this.velocity.y > canvasHeight){
            this.velocity.y *= -1
        }
    }

    contactWithPaddle(){
        
    }

    render(){
        this.c.fillStyle = this.color
        this.c.fillRect(this.position.x, this.position.y, this.radius, this.radius)
        
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        this.checkBallPoint()
        this.checkCollision()
        
    }
}

export class Background{
    constructor({color, c}){
        this.color = color
        this.c = c
    }

    render(){
        this.c.fillStyle = this.color
        this.c.fillRect(0, 0, canvasWidth, canvasHeight)
    }
}

