export default class Cena{
    /* É responsável por desenhar elementos
    na tela e animação
    */ 
    constructor(canvas, assets = null) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.sprites = [];
    this.aRemover = [];
    this.t0 = null;
    this.dt = 0;
    this.idAnim = null;
    this.assets = assets;
    this.mapa = null;
    this.game = null;
    this.spawn = 1;
     }
    desenhar() {
    this.ctx.fillStyle = "lightblue";
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height); 

    this.mapa?.desenhar(this.ctx);
    
    if(this.assets.acabou()){
    for (let s = 0; s < this.sprites.length; s++) {
        const sprite = this.sprites[s];
        sprite.desenhar(this.ctx);
        sprite.aplicaRestricoes();
    }
   }
    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(this.assets?.progresso(), 10, 20);
    

     }
     adicionar(sprite){
        sprite.cena = this;
        this.sprites.push(sprite);

     }
     passo(dt){
        if(this.assets.acabou()){
        for (const sprite of this.sprites) {
            sprite.passo(dt);
        }
        this.spawn -= dt;
        if(this.spawn<=0){
        this.quandoSpawn();
        this.spawn = 1;  
        }
      }
     }
     
     quadro(t){
            this.t0 = this.t0 ?? t;
            this.dt = (t - this.t0)/1000 ;

            this.passo(this.dt);
            this.desenhar();
            this.checaColisao();
            this.removerSprites();

            this.iniciar();
            this.t0 = t;
     }
     iniciar(){
        this.idAnim = requestAnimationFrame(
            (t) => {this.quadro(t);}
            );
     }
     parar(){
        cancelAnimationFrame(this.idAnim);
        this.t0 = null;
        this.dt = 0;
     }
     checaColisao(){
         for (let a = 0; a < this.sprites.length; a++) {
            const spriteA = this.sprites[a];
            for (let b = a + 1; b < this.sprites.length; b++) {
               const spriteB = this.sprites[b];

               if(spriteA.colidiuCom(spriteB)){
               this.quandoColidir(spriteA,spriteB);
               }
         }
        }
       }
       quandoSpawn()
       {


       }
       quandoColidir(a,b){
          if(!this.aRemover.includes(a)){
            this.aRemover.push(a);
          }
          if(!this.aRemover.includes(b)){
            this.aRemover.push(b);
          }         
         this.assets.play("moeda");
        }
        removerSprites(){
           for (const alvo of this.aRemover) {
            const idx = this.sprites.indexOf(alvo);
            if(idx >= 0 ){ 
                this.sprites.splice(idx, 1);
            }
          }
          this.aRemover = [];
        }
        configuraMapa(mapa){
         this.mapa = mapa;
         this.mapa.cena = this;
        }
      }

