import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/mapa1.js";
import modeloMapa2 from "../maps/mapa2.js";

export default class CenaJogo extends Cena {
  quandoColidir(a, b) {
    if (
      (a.tags.has("pc") && b.tags.has("moeda")) ||
      (b.tags.has("pc") && a.tags.has("moeda"))
    ) {
      if (a.tags.has("moeda")) {
        this.aRemover.push(a);
        this.assets.play("moeda");
        this.moedas ++;
        this.game.moedas++;
      console.log(this.moedas);
      } 
    } else if (
      (a.tags.has("enemy") && b.tags.has("moeda")) ||
      (b.tags.has("enemy") && a.tags.has("moeda"))
    ) {
    } else if (a.tags.has("moeda") && b.tags.has("moeda")) {
    } else if (
      (a.tags.has("pc") && b.tags.has("portal")) ||
      (b.tags.has("pc") && a.tags.has("portal"))
    ) {
      const mapa2 = new Mapa(20, 21, 32, this.assets);
      mapa2.carregaMapa(modeloMapa2);
      this.configuraMapa(mapa2);
      if (a.tags.has("portal")) {
        this.aRemover.push(a);
      } else {
        this.aRemover.push(b);
      }
    } else {
      if (!this.aRemover.includes(a)) {
        this.aRemover.push(a);
      }
      if (!this.aRemover.includes(b)) {
        this.aRemover.push(b);
      }
      if (
        (a.tags.has("pc") && b.tags.has("enemy")) ||
        (b.tags.has("pc") && a.tags.has("enemy"))
      ) {
        this.rodando = false;
        this.game.selecionaCena("fim");
      }
      this.assets.play("morte");
    }
  }

  preparar() {
    super.preparar();
    this.game.moedas = 0;
    const mapa1 = new Mapa(20, 21, 32, this.assets);
    mapa1.carregaMapa(modeloMapa1);
    this.configuraMapa(mapa1);
    this.quandoSpawn = function () {
      let ny = Math.floor(this.mapa.LINHAS * Math.random());
      let nx = Math.floor(this.mapa.COLUNAS * Math.random());
      let by = Math.floor(this.mapa.LINHAS * Math.random());
      let bx = Math.floor(this.mapa.COLUNAS * Math.random());
      while (this.mapa.tiles[ny][nx] != 0) {
        ny = Math.floor(this.mapa.LINHAS * Math.random());
        nx = Math.floor(this.mapa.COLUNAS * Math.random());
      }
      while (this.mapa.tiles[by][bx] != 0) {
        by = Math.floor(this.mapa.LINHAS * Math.random());
        bx = Math.floor(this.mapa.COLUNAS * Math.random());
      }
      const nvx = Math.floor(80 * Math.random()) - 40;
      const nvy = Math.floor(80 * Math.random()) - 40;
      const en1 = new Sprite({
        vx: nvx,
        vy: nvy,
        x: nx * this.mapa.SIZE + this.mapa.SIZE / 2,
        y: ny * this.mapa.SIZE + this.mapa.SIZE / 2,
        color: "red",
        controlar: perseguePC,
        tags: ["enemy"],
        img: this.assets.img("orc"),
      });

      const moeda = new Sprite({
        tags: ["moeda"],
        img_moeda: this.game.assets.img("imagem_moeda"),
        x: bx * this.mapa.SIZE + this.mapa.SIZE / 2,
        y: by * this.mapa.SIZE + this.mapa.SIZE / 2,
      });

      this.adicionar(en1);
      this.adicionar(moeda);
      en1.passo(0);
    };
    console.log(this.game);
    const pc = new Sprite({
      x: 300,
      tags: ["pc"],
      img: this.game.assets.img("garota"),
    });
    const portal = new Sprite({
      x: 350,
      y: 50,
      color: "purple",
      tags: ["portal"],
      img_portal: this.game.assets.img("portal"),
    });

    const cena = this;
    pc.controlar = function (dt) {
      if (cena.input.comandos.get("MOVE_ESQUERDA")) {
        this.vx = -100;
        pc.pose = 9;
      } else if (cena.input.comandos.get("MOVE_DIREITA")) {
        this.vx = +100;
        pc.pose = 11;
      } else {
        this.vx = 0;
      }
      if (cena.input.comandos.get("MOVE_CIMA")) {
        this.vy = -100;
        pc.pose = 8;
      } else if (cena.input.comandos.get("MOVE_BAIXO")) {
        this.vy = +100;
        pc.pose = 10;
      } else {
        this.vy = 0;
      }
    };
    this.adicionar(pc);
    this.adicionar(portal);
    function perseguePC(dt) {
      this.vx = Math.min(Math.abs(pc.x - this.x),25) * Math.sign(pc.x - this.x);
      this.vy = Math.min(Math.abs(pc.y - this.y),25) * Math.sign(pc.y - this.y);

      if (this.vx < 0 ){
        this.pose = 9;
      } else if (this.vx > 0 ){
        this.pose = 11;
      } 
    }
  }
}
