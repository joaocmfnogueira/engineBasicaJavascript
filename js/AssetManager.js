export default class AssetManager{
   constructor(){
       this.aCarregar = 0;
       this.carregadas = 0;
       this.imagens = new Map();
       this.audios = new Map();
   }

   carregaImagem(chave, source){
    const img1 = new Image() ;
    const that = this;
    img1.addEventListener("load", ()=> {
     console.log(`Imagem ${that.carregadas}/${that.aCarregar} carregada!`);
     that.carregadas++;
    });
    img1.src=source;
    this.imagens.set(chave , img1);
    this.aCarregar++;
   }

   carregaAudio(chave, source){
    const audio = new Audio();
    const that = this;
    audio.addEventListener("canplay", ()=> {
     console.log(`Audio ${that.carregadas}/${that.aCarregar} carregada!`);
     that.carregadas++;
    });
    audio.src=source;
    this.audios.set(chave , audio);
    this.aCarregar++;
   }

   img(chave){
  return this.imagens.get(chave);
   }

   audio(chave){
    return this.audios.get(chave);

     }
  
   progresso(){
   if(this.aCarregar>0){
    return`${(this.carregadas/this.aCarregar*100).toFixed(2)}%`;
   }
   return "nada a carregar";
   }

   acabou(){
      return this.carregadas === this.aCarregar;
   }

}