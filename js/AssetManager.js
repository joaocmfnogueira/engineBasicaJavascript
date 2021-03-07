export default class AssetManager{
   constructor(){
       this.aCarregar = 0;
       this.carregadas = 0;

   }
  
   progresso(){
   if(this.aCarregar>0){
    return`${(this.carregadas/this.aCarregar*100).toFixed(2)}%`;
   }
   return "nada a carregar";


   }

}