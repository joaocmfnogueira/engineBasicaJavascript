export default class Game{
    constructor(canvas, assets, input){
        this.canvas = canvas;
        this.assets = assets;
        this.input = input;
        this.cenas = new Map();
        this.cena = null;

    }
   adicionarCena(chave, cena){
    this.cenas.set(chave, cena);
    cena.game = this;
    cena.canvas = this.canvas;
    cena.assets = this.assets;
    cena.input = this.input;
   }












}