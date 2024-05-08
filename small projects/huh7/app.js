const canvas = document.getElementById('area')
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particaleArray = []
let hue = 0;

window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
})

const mouse = {
    x:null,
    y:null,
}

canvas.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for( i = 0; i < 10; i++){
        particaleArray.push(new Particale());
    }
})

class Particale{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 -1.5;
        this.color = 'hsl( '+ hue +',100%, 50%)'
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2){this.size -= 0.1}
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
        ctx.fill();
    }
}


function handleParticale(){
    for(let i = 0; i < particaleArray.length; i++){
        particaleArray[i].update();
        particaleArray[i].draw();
        if(particaleArray[i].size <= 0.3){
            particaleArray.splice(i,1)
            i--;
        }
    }
}

function animate(){
    // ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0,0, canvas.width, canvas.height);
    
    handleParticale()
    requestAnimationFrame(animate)
    hue +=0.5
}
animate()