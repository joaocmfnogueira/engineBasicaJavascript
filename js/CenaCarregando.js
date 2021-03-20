import Cena from "./Cena.js";

export default class CenaCarregando extends Cena{
    desenhar() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.font = "20px impact";
        this.ctx.fillStyle = "yellow";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.assets?.progresso(),this.canvas.width/2,
        this.canvas.height/2 );  
        if(this.assets.acabou()){   
        this.ctx.fillText("Aperte espaço para continuar",this.canvas.width/2,
        this.canvas.height/2 + 40 );  
       }
        
        
    
         }
}