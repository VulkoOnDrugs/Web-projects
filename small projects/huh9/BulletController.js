import Bullet from "./bullet.js";

export default class BulletController{
    bullets = [];
    timeTillNextBullet = 0;

    constructor(canvas){
        this.canvas = canvas;
       
    }
    shoot(x,y,speed,demage,delay){
        if(this.timeTillNextBullet <= 0){
            this.bullets.push(new Bullet(x,y,speed,demage))
            this.timeTillNextBullet = delay;

        }
    }

    draw(ctx){
        this.bullets.forEach((bullet) =>{
            if(this.isBulletOffScreen(bullet)){
            const index = this.bullets.indexOf(bullet);
            this.bullets.splice(index,1)
            }
            bullet.draw(ctx)
        })
    }
    colideWith(sprite){
        return this.bullets.some((bullet) => {
            if(bullet.colideWith(sprite)) {
                this.bullets.splice(this.bullets.indexOf(bullet),1);
                return true
            }
            return false
        })
    }
    isOutOfScreen(bullet){
        return bullet.y <= bullet.height;
    }
}