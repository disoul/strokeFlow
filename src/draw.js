/*
 * draw.js
 * Copyright (C) 2016 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import animation from './anime';

let canvas = document.createElement('canvas');
let container = document.getElementById('container');
canvas.width = container.clientWidth;
canvas.height = container.clientHeight;
let context = canvas.getContext('2d');

var path = [];
const maxPath = 10;

container.appendChild(canvas);

let vecData = new Uint8Array(canvas.width * canvas.height * 3);
for (let i = 0; i < canvas.width; i++) {
  for (let j = 0; j < canvas.height; j++) {
    vecData[i + j * canvas.width]     = 0;
    vecData[i + j * canvas.width + 1] = 1;
    vecData[i + j * canvas.width + 2] = 0;
  }
}

canvas.mouseState = 'up';
canvas.last = null;

document.addEventListener('mouseup', () => {
  canvas.mouseState = 'up';
  canvas.last = null;
  let start = Date.now();
  if (path.length > maxPath) {
    let newPath = [];
    let ratio = path.length / maxPath;

    for (let i = 0; i < maxPath; i++) {
      newPath.push(path[Math.floor(i * ratio)]);
    }
    path = newPath;
  }
  console.log(path);

  path.forEach(p => {
    updateField(p[0], p[1], 100);
  });

  console.log('done!', Date.now() - start);
  path = [];
});
document.addEventListener('mousedown', () => {canvas.mouseState = 'down'});
canvas.addEventListener('mousemove', (e) => {
  if (canvas.mouseState == 'down') {
    draw(e.clientX, e.clientY, canvas.last);
  }
});

function draw(x, y, last) {
  if (!last) {
    context.fillRect(x, y, 1, 1);
  } else {
    context.beginPath();
    context.moveTo(last[0], last[1]);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
    vecData[last[0] + last[1] * canvas.width] = x - last[0];
    vecData[last[0] + last[1] * canvas.width + 1] = y - last[1];
    vecData[last[0] + last[1] * canvas.width + 2] = 1;
  }
  canvas.last = [x, y];
  path.push([x, y]);
  console.log('push');
}

function updateField(x, y, range) {
  let base = x + y * canvas.width;
  let origin = [
    vecData[base],
    vecData[base + 1],
    vecData[base + 2]
  ];
  for (let d = 1; d < range; d++) {
    let vec = [
      origin[0] * (range - d) / range,
      origin[1] * (range - d) / range,
    ];
    for (let i = -1 * d; i <= d; i++) {
      for (let j = -1 * d; j <= d; j++) {
        let base = x + i + (y + j) * canvas.width;
        let data = [
          vecData[base],
          vecData[base + 1],
          vecData[base + 2],
        ];
        if (!data[0] && data[2]) continue;
        vecData[base] = data[0] + vec[0];
        vecData[base + 1] = data[1] + vec[1];
        vecData[base + 2] = false;
      }
    } 
  }
}

export default vecData;
