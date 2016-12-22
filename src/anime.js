/*
 * anime.js
 * Copyright (C) 2016 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */

class AnimationController {
  constructor() {
    this.animations = {};
    this.init();
    console.log('constructor!', this);
  }

  init() {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    for (let key in this.animations) {
      this.animations[key].draw.bind(this.animations[key].context)();
    }

    window.requestAnimationFrame(this.loop.bind(this));
  }

  append(anime, key) {
    this.animations[key] = anime;
  }
}

let animation = new AnimationController();
export default animation;
