export default class AssetManager{
   constructor(mixer = null){
       this.aCarregar = 0;
       this.carregadas = 0;
       this.imagens = new Map();
       this.audios = new Map();
       this.mixer = mixer;
   }

   carregaImagem(chave, source){
    const img1 = new Image() ;
    const that = this;
    img1.addEventListener("load", ()=> {
     that.carregadas++;
    });
    img1.src = source;
    this.imagens.set(chave , img1);
    this.aCarregar++;
   }

   carregaAudio(chave, source){
    const audio = new Audio();
    audio.addEventListener("loadeddata", () => {
     this.carregadas++;
    });
    audio.src = source;
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

   play(chave){
    this.mixer?.play(this.audio(chave));

   }

}