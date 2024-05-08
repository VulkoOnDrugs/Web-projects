const canvas = document.getElementById('pongGame');
const ctx = canvas.getContext('2d');

const paddleHeight = 100;
const paddleWidht = 20; // should be paddleWidth
const paddleSpeed = 50;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius:10,
    velocityX:5,
    velocityY:5
}

let player1Y = canvas.height /2 - paddleHeight /2;
let player2Y = canvas.height /2 - paddleHeight /2;
let player1score = 69;
let player2score = 0;

function drawCircle(x, y, radius, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function render(){
    drawRect(0, 0, canvas.width, canvas.height, '#333');
    drawRect(0, player1Y, paddleWidht, paddleHeight, 'blue'); 
    drawRect(canvas.width - paddleWidht, player2Y, paddleWidht, paddleHeight, 'red'); 
    drawCircle(ball.x, ball.y, ball.radius, 'orange');
    drawtext(player1score,canvas.width/4,canvas.height/5,'white'); 
    drawtext(player2score,canvas.width/4*3,canvas.height/5,'white');
}

function drawRect(x, y, width, height, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawtext(text,x,y,color){
    ctx.fillStyle = color;
    ctx.font = '45px fantasy'
    ctx.fillText(text,x,y);
}

function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.velocityY = -ball.velocityY;

}

function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if(ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0){
        ball.velocityY = -ball.velocityY
    }

    if(ball.x + ball.radius >= canvas.width){
        player1score++;
        resetBall()
    }else if(ball.x - ball.radius <=0){
        player2score++;
        resetBall()
    }

    if(ball.x - ball.radius <= paddleWidht && 
        ball.y >= player1Y &&
        ball.y <= player1Y + paddleHeight){
            ball.velocityX = -ball.velocityX;
        }
   
    if(ball.x + ball.radius >= canvas.width - paddleWidht && 
        ball.y >= player2Y &&
        ball.y <= player2Y + paddleHeight){
            ball.velocityX = -ball.velocityX;
        }
}

function gameLoop(){
    update()
    render();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', function(event){
    switch(event.key){
        case 'w':if(player1Y > 0){
            player1Y -= paddleSpeed;
        }break;
        case 's':if(player1Y < canvas.height - paddleHeight){
            player1Y += paddleSpeed
        }break;
        case 'ArrowUp':if(player2Y > 0){
            player2Y -= paddleSpeed;
        }break;
        case 'ArrowDown':if(player2Y < canvas.height - paddleHeight){
            player2Y += paddleSpeed
        }break;
    }
})

gameLoop();