/*
 * flow.js
 * Copyright (C) 2016 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */

import animation from './anime';
import Utils from 'aliyun-map-utils';

class Particle {
  constructor(w, h, life) {
    this.w = w;
    this.h = h;
    this.baseLife = life;
    this.init();
  }

  init() {
    this.x = Math.random() * this.w;
    this.y = Math.random() * this.h;
    this.life = this.baseLife * Math.random() / 2 + 0.5;
  }

  updateLife(vec) {
    //if (!vec[0] && !vec[1]) return;
    this.life--;
    this.x = this.x + vec[0] / 100;
    this.y = this.y + vec[1] / 100;
    if (this.life < 0) {
      this.init();
    }
  }
}

export default class Flow {
  constructor(container, count) {
    this.container = container;
    this.init();
    this.sprite = Utils.getSprite({
      'width': 10,
      'height': 10,
      'isContinue': false,
      'drawN': 7.4,
      'type': 'radian',
      'color': {
        'from': 'rgba(0,255,161,0.99)',
        'to': 'rgba(0,150,255,0)',
        'easing': 'Linear.None.1.7',
        'space': 'rgb'
      }
    });

    this.getParticles(count);
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.container.clientHeight;
    this.canvas.id = "flow";
    this.container.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
    this.tmpCanvas = document.createElement('canvas');
    this.tmpCanvas.width = this.container.clientWidth;
    this.tmpCanvas.height = this.container.clientHeight;
    this.tmpContext = this.tmpCanvas.getContext('2d');
  }

  render(d) {
    this.data = d;
    animation.append({
      draw: this.draw,
      context: this,
    }, 'flow');
  }

  getParticles(count) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(this.canvas.width, this.canvas.height, 100));
    }
  }

  getVec(x, y) {
    x = Math.round(x);
    y = Math.round(y);
    return [
      this.data[(x + y * this.canvas.width) * 3],
      this.data[(x + y * this.canvas.width) * 3 + 1],
    ];
  }

  updateTempCanvas() {
    let ctx = this.tmpCanvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(this.canvas, 0, 0);
    ctx.globalAlpha = 0.9;
  }

  draw() {
    this.updateTempCanvas();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.tmpCanvas, 0, 0);
    this.context.fillStyle = '#fff';
    this.particles.forEach(p => {
      this.context.drawImage(this.sprite, p.x, p.y);
      //this.context.fillRect(p.x, p.y, 2, 2);
      p.updateLife(this.getVec(p.x, p.y));
    })
  }
}
