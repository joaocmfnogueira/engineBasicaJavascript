export default class Mapa {
constructor(linhas = 8, colunas = 12, tamanho = 32){
  this.LINHAS = linhas;
  this.COLUNAS = colunas;
  this.SIZE = tamanho;
  this.tiles = [];
    for (let l = 0; l < this.LINHAS; l++) {
        this.tiles[l] = [];
        for (let c = 0; c < this.COLUNAS; c++) {
           this.tiles[l][c] = 0;   
       } 
     }
     this.cena = null;
   }
  desenhar(ctx){
    for (let l = 0; l < this.LINHAS; l++) {
        for (let c = 0; c < this.COLUNAS; c++) {
           switch (this.tiles[l][c]){
            case 1:
            ctx.fillStyle = "grey";
            ctx.fillRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
            ctx.linesWidth = 1;
            ctx.strokeStyle = "black";
            ctx.strokeRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
            break;
            case 2:
            ctx.fillStyle = "red";
            ctx.fillRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
            ctx.linesWidth = 1;
            ctx.strokeStyle = "orange";
            ctx.strokeRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
            break;
            default:
            ctx.fillStyle = "black";
            ctx.fillRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
            ctx.linesWidth = 1;
            ctx.strokeStyle = "grey";
            ctx.strokeRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
         }       
       }
     }
   }
   carregaMapa(modelo){
       this.LINHAS = modelo.length;
       this.COLUNAS = modelo[0]?.length ?? 0;

    this.tile = [];
    for (let l = 0; l < this.LINHAS; l++) {
        this.tiles[l] = [];
        for (let c = 0; c < this.COLUNAS; c++) {
           this.tiles[l][c] = modelo[l][c];   
       } 
     }
   }
 }