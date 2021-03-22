export default class Sprite {
  /*
        É responsável por modelar algo que se move na tela.
    */
  constructor({
    x = 100,
    y = 100,
    w = 20,
    h = 20,
    assets = null,
    color = "white",
    vx = 0,
    vy = 0,
    img = null,
    img1 = null,
    controlar = () => {},
    tags = [],
  } = {}) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.w = w;
    this.h = h;
    this.color = color;
    this.cena = null;
    this.assets = assets;
    this.mx = 0;
    this.my = 0;
    this.img = img;
    this.img1 = img1;
    this.controlar = controlar;
    this.pose = 0;
    this.quadro = 0;
    this.tags = new Set();
    tags.forEach((tags) => {
      this.tags.add(tags);
    });
    this.POSES = [
        {qmax: 7, pv:9},
        {qmax: 7, pv:9},
        {qmax: 7, pv:9},
        {qmax: 7, pv:9}, 
        {qmax: 8, pv:9},
        {qmax: 8, pv:9},
        {qmax: 8, pv:9},
        {qmax: 8, pv:9}, 
        {qmax: 9, pv:9},
        {qmax: 9, pv:9},
        {qmax: 9, pv:9},
        {qmax: 9, pv:9},
        {qmax: 6, pv:9},
        {qmax: 6, pv:9},
        {qmax: 6, pv:9},
        {qmax: 6, pv:9},
        {qmax: 13, pv:18}, 
        {qmax: 13, pv:18},
        {qmax: 13, pv:18},
        {qmax: 13, pv:18}, 
        {qmax: 6, pv:9 }
        ];

  }
  desenhar(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.strokeStyle = "blue";
    ctx.strokeRect(
      this.mx * this.cena.mapa.SIZE,
      this.my * this.cena.mapa.SIZE,
      this.cena.mapa.SIZE,
      this.cena.mapa.SIZE
    );
    if (this.img) {
      ctx.drawImage(
        this.img,
        //sx, sy, sw, sh
        Math.floor(this.quadro) * 64,
        this.pose * 64,
        64,
        64,
        //dx, dy, dw, dh
        this.x - 32,
        this.y - 64 + 8,
        64,
        64
      );
    }
    if (this.img1) {
      ctx.drawImage(
        this.img1,
        //sx, sy, sw, sh
        0,
        0,
        700,
        700,
        //dx, dy, dw, dh
        this.x - 15,
        this.y - 15,
        48,
        48
      );
    }

  }
  controlar(dt) {}
  mover(dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
    this.mx = Math.floor(this.x / this.cena.mapa.SIZE);
    this.my = Math.floor(this.y / this.cena.mapa.SIZE);
    this.quadro =
      this.quadro >= this.POSES[this.pose].qmax - 1
        ? 0
        : this.quadro + this.POSES[this.pose].pv * dt;
  }
  passo(dt) {
    this.controlar(dt);
    this.mover(dt);
  }
  colidiuCom(outro) {
    return !(
      this.x - this.w / 2 > outro.x + outro.w / 2 ||
      this.x + this.w / 2 < outro.x - outro.w / 2 ||
      this.y - this.h / 2 > outro.y + outro.h / 2 ||
      this.y + this.h / 2 < outro.y - outro.h / 2
    );
  }
  aplicaRestricoes(dt) {
    this.aplicaRestricoesCima(this.mx, this.my - 1);
    this.aplicaRestricoesBaixo(this.mx, this.my + 1);
    this.aplicaRestricoesEsquerda(this.mx - 1, this.my);
    this.aplicaRestricoesDireta(this.mx + 1, this.my);
    this.aplicaRestricoesDireta(this.mx + 1, this.my - 1);
    this.aplicaRestricoesDireta(this.mx + 1, this.my + 1);
    this.aplicaRestricoesEsquerda(this.mx - 1, this.my - 1);
    this.aplicaRestricoesEsquerda(this.mx - 1, this.my + 1);
    this.aplicaRestricoesBaixo(this.mx + 1, this.my + 1);
    this.aplicaRestricoesBaixo(this.mx - 1, this.my + 1);
    this.aplicaRestricoesCima(this.mx + 1, this.my - 1);
    this.aplicaRestricoesCima(this.mx - 1, this.my - 1);
  }
  aplicaRestricoesDireta(pmx, pmy) {
    if (this.vx > 0) {
      const SIZE = this.cena.mapa.SIZE;
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };
        this.cena.ctx.strokeStyle = "White";
        this.cena.ctx.strokeRect(
          tile.x - SIZE / 2,
          tile.y - SIZE / 2,
          SIZE,
          SIZE
        );
        if (this.colidiuCom(tile)) {
          this.vx = 0;
          this.x = tile.x - tile.w / 2 - this.w / 2 - 1;
        }
      }
    }
  }
  aplicaRestricoesEsquerda(pmx, pmy) {
    if (this.vx < 0) {
      const SIZE = this.cena.mapa.SIZE;
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };
        this.cena.ctx.strokeStyle = "White";
        this.cena.ctx.strokeRect(
          tile.x - SIZE / 2,
          tile.y - SIZE / 2,
          SIZE,
          SIZE
        );
        if (this.colidiuCom(tile)) {
          this.vx = 0;
          this.x = tile.x + tile.w / 2 + this.w / 2 + 1;
        }
      }
    }
  }
  aplicaRestricoesBaixo(pmx, pmy) {
    if (this.vy > 0) {
      const SIZE = this.cena.mapa.SIZE;
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };
        this.cena.ctx.strokeStyle = "White";
        this.cena.ctx.strokeRect(
          tile.x - SIZE / 2,
          tile.y - SIZE / 2,
          SIZE,
          SIZE
        );
        if (this.colidiuCom(tile)) {
          this.vy = 0;
          this.y = tile.y - tile.h / 2 - this.h / 2 - 1;
        }
      }
    }
  }
  aplicaRestricoesCima(pmx, pmy) {
    if (this.vy < 0) {
      const SIZE = this.cena.mapa.SIZE;
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };
        this.cena.ctx.strokeStyle = "White";
        this.cena.ctx.strokeRect(
          tile.x - SIZE / 2,
          tile.y - SIZE / 2,
          SIZE,
          SIZE
        );
        if (this.colidiuCom(tile)) {
          this.vy = 0;
          this.y = tile.y + tile.h / 2 + this.h / 2 + 1;
        }
      }
    }
  }
}
