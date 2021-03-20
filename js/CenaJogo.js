import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import  modeloMapa1 from "../maps/mapa1.js";


export default class CenaJogo extends Cena{

    quandoColidir(a,b){
        if(!this.aRemover.includes(a)){
          this.aRemover.push(a);
        }
        if(!this.aRemover.includes(b)){
          this.aRemover.push(b);
        }         
       if(a.tags.has("pc") && b.tags.has("enemy")){
        this.rodando = false;
        this.game.selecionaCena("fim");
       }
       this.assets.play("moeda");
       
      }
    preparar(){
        super.preparar();
        const mapa1 = new Mapa(20, 21, 32,this.assets);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);
        this.quandoSpawn = function() {
             let ny = Math.floor(this.mapa.LINHAS*Math.random());
             let nx = Math.floor(this.mapa.COLUNAS*Math.random());
             while(this.mapa.tiles[ny][nx]!=0)
             {
                  ny = Math.floor(this.mapa.LINHAS*Math.random());
                  nx = Math.floor(this.mapa.COLUNAS*Math.random());
             }
             const nvx = Math.floor(80*Math.random()) - 40;
             const nvy = Math.floor(80*Math.random()) - 40;
        
             const en1 = new Sprite({vx: nvx,vy: nvy,x: nx*this.mapa.SIZE + this.mapa.SIZE/2,y: ny*this.mapa.SIZE + this.mapa.SIZE/2, color:"red",controlar: perseguePC,tags:["enemy"]});
             this.adicionar(en1);
             en1.passo(0);
        }
        const pc = new Sprite({x:300,tags:["pc"]});
        const cena = this;
        pc.controlar = function (dt) {
        if(cena.input.comandos.get("MOVE_ESQUERDA")){
        this.vx = -50;
        }else if(cena.input.comandos.get("MOVE_DIREITA")){
            this.vx = +50;
            }
        else{
                this.vx = 0;
            }
            if(cena.input.comandos.get("MOVE_CIMA")){
                this.vy = -50;
                }else if(cena.input.comandos.get("MOVE_BAIXO")){
                    this.vy = +50;
                    }
                else{
                        this.vy = 0;
                    }
        };
        this.adicionar(pc);
        
        function perseguePC(dt) {
            this.vx = 25*Math.sign(pc.x - this.x);
            this.vy = 25*Math.sign(pc.y - this.y);
        };
    }
}