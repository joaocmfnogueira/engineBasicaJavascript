export default class Mapa {
constructor(linhas = 8, colunas = 12, tamanho = 32, assets = null){
  this.LINHAS = linhas;
  this.COLUNAS = colunas;
  this.SIZE = tamanho;
  this.tiles = [];
  this.assets = assets;
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
              /*
            ctx.fillStyle = "grey" ;
            ctx.linesWidth = 1;
            ctx.strokeStyle = "black";  
            */
            ctx.drawImage(this.assets.img("parede"), c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);   
            break;
            case 2:
              /*
            ctx.fillStyle = "red";
            ctx.linesWidth = 1;
            ctx.strokeStyle = "orange";
            break;
            
            ctx.drawImage(this.assets.img("portal"), c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
            break;
            */
            default:        
              /*
            ctx.fillStyle = "black";
            ctx.linesWidth = 1;
            ctx.strokeStyle = "grey";
            */
            ctx.drawImage(this.assets.img("piso"), c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
         }    
         /*
          ctx.fillRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
          ctx.strokeRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
        */
        
       }
     }
   }
   carregaMapa(modelo){
       this.LINHAS = modelo.length;
       this.COLUNAS = modelo[0]?.length ?? 0;

    this.tiles = [];
    for (let l = 0; l < this.LINHAS; l++) {
        this.tiles[l] = [];
        for (let c = 0; c < this.COLUNAS; c++) {
           this.tiles[l][c] = modelo[l][c];   
       } 
     }
   }
 }