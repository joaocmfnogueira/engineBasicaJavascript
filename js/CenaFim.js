import Cena from "./Cena.js";

export default class CenaFim extends Cena{
    desenhar() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.font = "20px impact";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.ctx.fillText("GAME OVER",this.canvas.width/2,
        this.canvas.height/2 );  
        if(this.assets.acabou()){   
        this.ctx.fillText("Aperte espaço para jogar novamente",this.canvas.width/2,
        this.canvas.height/2 + 40 );  
       }
    }       
   quadro(t){
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0)/1000 ;
    if(this.assets.acabou()){
           
        if(this.input.comandos.get("PROXIMA_CENA")){
           this.game.selecionaCena("jogo");
           return;
        }          
     }
    
    this.desenhar();
    this.iniciar();
    this.t0 = t;   
}
   
}