import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import  modeloMapa1 from "../maps/mapa1.js";
import InputManager from"./InputManager.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("garota","assets/garota.png");
assets.carregaImagem("esqueleto","assets/skelly.png");
assets.carregaImagem("orc","assets/orc.png");
assets.carregaAudio("moeda","assets/coin.wav");
assets.carregaImagem("piso","assets/piso.png");  
assets.carregaAudio("boom","assets/boom.wav");
assets.carregaImagem("parede","assets/parede.png"); 
    

const canvas = document.querySelector("canvas");
canvas.width = 21*32;
canvas.height = 20*32;

input.configurarTeclado({
"ArrowLeft" : "MOVE_ESQUERDA",
"ArrowRight" : "MOVE_DIREITA",


});
const cena1 = new Cena(canvas,assets);

const mapa1 = new Mapa(20, 21, 32,assets);
mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);
cena1.quandoSpawn = function() {
     let ny = Math.floor(this.mapa.LINHAS*Math.random());
     let nx = Math.floor(this.mapa.COLUNAS*Math.random());
     while(this.mapa.tiles[ny][nx]!=0)
     {
          ny = Math.floor(this.mapa.LINHAS*Math.random());
          nx = Math.floor(this.mapa.COLUNAS*Math.random());
     }
     const nvx = Math.floor(80*Math.random()) - 40;
     const nvy = Math.floor(80*Math.random()) - 40;

     const en1 = new Sprite({vx: nvx,vy: nvy,x: nx*this.mapa.SIZE + this.mapa.SIZE/2,y: ny*this.mapa.SIZE + this.mapa.SIZE/2, color:"red"});
     this.adicionar(en1);
     en1.passo(0);
}
cena1.iniciar();

document.addEventListener("keydown", (e) => {
switch (e.key) {
    case "s":
        cena1.iniciar();   
        break;
    case "S":
        cena1.parar();   
        break;
    case "c":
       assets.play("moeda");   
        break;   
     case "b":
       assets.play("boom");   
        break;  
}
} );