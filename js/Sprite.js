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
        ctx.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
    }
    passo(dt){
        this.x = this.x + this.vx*dt
        this.y = this.y + this.vy*dt
    }
    colidiuCom(outro){
        return!(
        this.x - this.w/2 > outro.x + outro.w/2 ||
        this.x + this.w/2 < outro.x - outro.w/2 ||
        this.y - this.h/2 > outro.y + outro.h/2 ||
        this.y + this.h/2 < outro.y - outro.h/2
        );
    }



}