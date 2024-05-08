var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

let bricksRow = 5;
let bricksColum = 8;
let bricksHeight = 20;
let bricksPadding = 10;
let bricksTopOffSet = 30;
let bricksLeftOffSet = 30;
let bricksWidth = 50;

let bricks = [];
for (let c = 0; c < bricksColum;c++){
    bricks[c] = []
    for( let r=0;r<bricksRow; r++){
        let bricksX = c * (bricksWidth + bricksPadding) + bricksLeftOffSet;
        let bricksY = r * (bricksHeight + bricksPadding) + bricksTopOffSet;
        let health = Math.floor(Math.random() * 3) + 1
        bricks[c][r] = {x:bricksX,y:bricksY,status:health}
        console.log(bricks[c][r])
    }
}

function drawBricks(){
    for(let c = 0; c < bricksColum; c++){
        for(let r = 0; r < bricksRow; r++){
            if(bricks[c][r].status > 0){
                let bricksX = bricks[c][r].x;
                let bricksY = bricks[c][r].y;

                if(bricks[c][r].status === 1){
                    ctx.fillStyle = 'green'
                }else if(bricks[c][r].status === 2){
                    ctx.fillStyle = 'orange'
                }else{
                    ctx.fillStyle = 'red'
                }

                ctx.beginPath();
                ctx.rect(bricksX,bricksY,bricksWidth,bricksHeight);
                ctx.fill();
                ctx.closePath();

            }
        }
    }
}

var paddleHeight = 15;
var paddleWidht = 75;
var paddleX = (canvas.width - paddleWidht) / 2

let rightPressed = false;
let leftPressed = false;

let speed = 4;
let ballradius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = speed;
let dy = - speed;

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballradius,0,Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

document.addEventListener('keydown',keyDown,false);
document.addEventListener('keyup',keyUp,false);

function keyDown(e){
    if(e.key == 'd' || e.key == 'ArrowRight'){
        rightPressed = true;
    }else if(e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = true;
    }
}

function keyUp(e){
    if(e.key == 'd' || e.key == 'ArrowRight'){
        rightPressed = false;
    } else if(e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = false;
    }
}

function movePaddle(){
    if(rightPressed && paddleX < canvas.width - paddleWidht){
        paddleX += 7
    }else if(leftPressed && paddleX > 0){
        paddleX -= 7
    }
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height - paddleHeight,paddleWidht,paddleHeight);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawBall();
    movePaddle();
    drawPaddle();
    requestAnimationFrame(draw);
}

draw();