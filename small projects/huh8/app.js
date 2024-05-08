const canvas = document.getElementById('area');
const ctx = canvas.getContext('2d');
const particaleArray = [];
let speed = 3

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})


class Particale{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * speed - speed/2
        this.speedY = Math.random() * speed - speed/2
        
    }

    draw(){
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
        ctx.fill();
        }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }    
    
}

function handleParticale(){
    for( i = 0; i < particaleArray.length; i++){
        particaleArray[i].draw();
        particaleArray[i].update();
        for( j = i; j < particaleArray.length; j++){
            const dx = particaleArray[i].x - particaleArray[j].x;
            const dy = particaleArray[i].y - particaleArray[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
           
            if(distance < 100){
                ctx.strokeStyle = 'blue';
                ctx.beginPath();
                ctx.lineWidth = 0.1;
                ctx.moveTo(particaleArray[i].x, particaleArray[i].y);
                ctx.lineTo(particaleArray[j].x, particaleArray[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate(){
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    handleParticale();
    requestAnimationFrame(animate);
    // 
}
intt();
animate();

function intt(){
    for(let i = 0; i < 500; i++){
        particaleArray.push(new Particale());
    }
}

