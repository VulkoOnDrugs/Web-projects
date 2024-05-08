import Enemy from "./enemy.js";
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 550;
canvas.height = 600;
const enemies = [
    new Enemy(50,20,"green",5),
    new Enemy(150,20,"red",5),
    new Enemy(250,20,"gold",5),
    new Enemy(350,20,"green",5),
    new Enemy(450,20,"gold",5),
    new Enemy(50,100,"green",5),
    new Enemy(150,100,"red",5),
    new Enemy(250,100,"gold",5),
    new Enemy(350,100,"green",5),
    new Enemy(450,100,"gold",5)
]
function gameLoop(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    requestAnimationFrame(gameLoop)
}

gameLoop();

function setComnStyle(){
    ctx.shadowColor = '#d53'
    ctx.shadowBlur = 20;
    ctx.lineJoin = 'bevel'
    ctx.lineWidth
}

setComnStyle();