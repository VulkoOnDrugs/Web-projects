const canvas = document.getElementById('gameArea')
const ctx = canvas.getContext('2d')
// ctx means context, used for const too

let x = canvas.width/2;
let y = canvas.height/2;
let radius = 50;
let speed = 10;

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

document.body.addEventListener('keydown',keyDown);
document.body.addEventListener('keyup',keyUp)

function boundaryCheck(){
    if(x < radius ) {x = radius}
    if(y < radius ) {y = radius}
    if(x > canvas.width - radius) { x = canvas.width - radius}
    if(y > canvas.height - radius) {y = canvas.height -radius}
}

function inputs(){
    if(upPressed){y = y - speed}
    if(downPressed){y = y + speed}
    if(leftPressed){x = x - speed}
    if(rightPressed){x = x + speed}
}

function keyDown(event){
    if(event.keyCode == 38){ upPressed = true }
    if(event.keyCode == 40){ downPressed = true }
    if(event.keyCode == 37){ leftPressed = true }
    if(event.keyCode == 39){ rightPressed = true }
}

function keyUp(event){
    if(event.keyCode == 38){ upPressed = false }
    if(event.keyCode == 40){ downPressed = false }
    if(event.keyCode == 37){ leftPressed = false }
    if(event.keyCode == 39){ rightPressed = false }
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width,canvas.height);
    ctx.fill();
}

function drawCircle(){
    ctx.fillStyle = 'blue'
    ctx.beginPath();
    ctx.arc(x,y, radius,0,Math.PI * 2);
    ctx.fill()
}

function draw(){
    inputs();
    boundaryCheck();
    requestAnimationFrame(draw);
    clearScreen();
    drawCircle();
}
draw()

















// const text = 'Demo Text';
// ctx.fillStyle = 'blue';
// ctx.font = '100px sans-serif';
// ctx.fillText(text, 100,100);


// ctx.strokeStyle = 'greenyellow';
// ctx.lineWidth = 3;
// ctx.strokeText(text, 100,100);

// ctx.beginPath();
// ctx.moveTo(0,canvas.height/2);
// ctx.lineTo(canvas.width,canvas.height/2);
// ctx.stroke()

