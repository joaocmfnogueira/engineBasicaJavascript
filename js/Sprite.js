export default class Sprite {
    /*
        É responsável por modelar algo que se move na tela.
    */
    constructor({x=100, y=100, w=20, h=20, color="white", vx=0, vy=0}={}){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    desenhar(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }
    passo(dt){
        this.x = this.x + this.vx*dt
        this.y = this.y + this.vy*dt
    }
    colidiuCom(outro){
        return!(
        this.x > outro.x + outro.w ||
        this.x + this.w < outro.x ||
        this.y > outro.y + outro.h ||
        this.y + this.h < outro.y
        );
    }



}