export default class Game{
    constructor(canvas, assets, input){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.assets = assets;
        this.input = input;
        this.cenas = new Map();
        this.cena = null;

    }
   adicionarCena(chave, cena){
    this.cenas.set(chave, cena);
    cena.game = this;
    console.log("cena");
    cena.canvas = this.canvas;
    cena.assets = this.assets;
    cena.ctx = this.ctx;
    cena.input = this.input;
    if(this.cena===null){
        this.cena = cena;
    }
   }
   selecionaCena(chave){
    if(this.cenas.has(chave)){
        console.log(chave);
        this.parar();
        this.cena = this.cenas.get(chave);
        this.cena.preparar();
        this.iniciar();
    }
   }
   iniciar(){
       this.cena?.iniciar();

   }
   parar(){
       this.cena?.parar();
   }










}