import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import  modeloMapa1 from "../maps/mapa1.js";

const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("garota","assets/garota.png");
assets.carregaImagem("esqueleto","assets/skelly.png");
assets.carregaImagem("orc","assets/orc.png");
assets.carregaAudio("moeda","assets/coin.wav");
assets.carregaAudio("boom","assets/boom.wav");
   
    

const canvas = document.querySelector("canvas");
canvas.width = 21*32;
canvas.height = 20*32;
const cena1 = new Cena(canvas,assets);

const mapa1 = new Mapa(20, 21, 32);
mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);

    const c2 = 400 + Math.floor(228*Math.random());
    const c1 = 44 + Math.floor(9*32*Math.random());
    const c22 = 400 + Math.floor(228*Math.random());
    const c11 = 44 + Math.floor(9*32*Math.random());
    const cs = 1 - Math.floor(2*Math.random());
    const css = 1 - Math.floor(2*Math.random());
    
    let  a = 0;
    if(cs<=0)
    {
         a = c1;
         
    }
    else{
         a = c2;
    }
    let aa = 0;
    if(css<=0)
    {
         aa = c11;
         
    }
    else{
         aa = c22;
    }

const b = 44 + Math.floor(17*32*Math.random());

const pc = new Sprite({vx: Math.floor(8*5*Math.random()) - 20 ,vy: Math.floor(8*5*Math.random()) - 20,x: a ,y: b ,vx: 0, color: "white"});
const en1 = new Sprite({vx: Math.floor(8*5*Math.random()) - 20,vy: Math.floor(8*5*Math.random()) - 20,x: aa,y: b, color:"red"});

cena1.adicionar(pc);
cena1.adicionar(en1);
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