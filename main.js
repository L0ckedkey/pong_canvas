import { ballRadius, ballSpeedX, ballSpeedY, canvasHeight, canvasWidth, margin, paddleHeight, paddleSpeed, paddleWidth } from './config.js'
import { Paddle, Ball, Background } from './model.js'

let canvas = document.getElementById('canvas')
let c = canvas.getContext('2d')

export let keys = []

c.imageSmoothingEnabled = false

canvas.height = canvasHeight
canvas.width = canvasWidth

var leftPaddle = new Paddle({
    position: {
        x: margin,
        y: 100
    },
    speed: paddleSpeed,
    size: {
        width: paddleWidth,
        height: paddleHeight
    },
    color: 'green',
    id: 'left',
    c: c
})


var rightPaddle = new Paddle({
    position: {
        x: canvasWidth - margin,
        y: 0
    },
    speed: paddleSpeed,
    size: {
        width: paddleWidth,
        height: paddleHeight
    },
    color: 'red',
    id: 'left',
    c: c
})

var ball = new Ball({
    position: {
        x: canvasWidth/2,
        y: canvasHeight/2
    },
    velocity: {
        x: ballSpeedX,
        y: ballSpeedY
    },
    size: {
        radius: ballRadius
    },
    color: 'white',
    id: 'left',
    c: c
})

const background = new Background({
   color: "black",
   c: c
})

window.addEventListener('keydown', (e) => {
    if(e.key == 'w'){
        keys['w'] = true
    }

    if(e.key == 's'){
        keys['s'] = true
    }

    if(e.key == 'ArrowUp'){
        keys['ArrowUp'] = true
    }

    if(e.key == 'ArrowDown'){
        keys['ArrowDown'] = true
    }
})

window.addEventListener('keyup', (e) => {
    if(e.key == 'w'){
        keys['w'] = false
    }

    if(e.key == 's'){
        keys['s'] = false
    }

    if(e.key == 'ArrowUp'){
        keys['ArrowUp'] = false
    }

    if(e.key == 'ArrowDown'){
        keys['ArrowDown'] = false
    }
})

function checkKeys(){
    if(keys['w']){
        leftPaddle.move('up')
    }
    if(keys['s']){
        leftPaddle.move('down')
    }

    if(keys['ArrowUp']){
        rightPaddle.move('up')
    }

    if(keys['ArrowDown']){
        rightPaddle.move('down')
    }
}

function checkBallColliding(){
    if(ball.velocity.x < 0){
        if(ball.position.x + ball.velocity.x < leftPaddle.position.x + leftPaddle.width &&
            (
                ball.position.y + ball.velocity.y >= leftPaddle.position.y &&
                ball.position.y + ball.velocity.y <= leftPaddle.position.y + leftPaddle.height
            )){
            
            ball.velocity.x *= -1
        }
        
    }else{
        if(ball.position.x + ball.velocity.x > rightPaddle.position.x - rightPaddle.width &&
            (
                ball.position.y + ball.velocity.y >= rightPaddle.position.y &&
                ball.position.y + ball.velocity.y <= rightPaddle.position.y + rightPaddle.height
            )){

            ball.velocity.x *= -1
        }
        
    }
    
}

let msPrev = window.performance.now()
const fps = 60
const msPerFrame = 1000/fps


function animate(){
    c.clearRect(0, 0, canvasWidth, canvasHeight)
    checkKeys()
    checkBallColliding()
    background.render()
    leftPaddle.render()
    rightPaddle.render()
    ball.render()
    requestAnimationFrame(animate)
    const msNow = window.performance.now()
    const msPassed = msNow - msPrev

    if(msPassed < msPerFrame) return
    const excessTime = msPassed % msPerFrame
    msPrev = msNow - excessTime

}


animate()