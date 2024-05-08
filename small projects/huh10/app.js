const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

canvas.height = 600;
canvas.width = 600;
const backround = new Image();
backround.src = 'sky.jpg'

function game(){
    ctx.drawImage(backround,0,0, canvas.width,canvas.height)
    requestAnimationFrame(game)

}

game()