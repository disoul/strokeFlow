/**
* @Author: disoul
* @Date:   2016-12-22T17:28:38+08:00
* @Last modified by:   disoul
* @Last modified time: 2016-12-25T19:51:14+08:00
*/



/*
 * draw.js
 * Copyright (C) 2016 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import animation from './anime';

let canvas = document.createElement('canvas');
let container = document.getElementById('container');
let button = document.getElementById('enter');
canvas.id = "vec";
canvas.width = container.clientWidth;
canvas.height = container.clientHeight;
let context = canvas.getContext('2d');

var path = [];
const maxPath = 30;

container.appendChild(canvas);

//var vecData = new Int16Array(canvas.width * canvas.height * 3);
var vecData = [];
for (let i = 0; i < canvas.width; i++) {
  for (let j = 0; j < canvas.height; j++) {
    vecData[(i + j * canvas.width) * 3]     = 0;
    vecData[(i + j * canvas.width) * 3 + 1] = 0;
    vecData[(i + j * canvas.width) * 3 + 2] = false;
  }
}

canvas.mouseState = 'up';
canvas.last = null;

document.addEventListener('mouseup', () => {
  canvas.mouseState = 'up';
  canvas.last = null;
  let start = Date.now();
  console.log(button);
  if (path.length - 1> maxPath) {
    let newPath = [];
    let ratio = path.length / maxPath;

    for (let i = 0; i < maxPath; i++) {
      newPath.push(path[Math.floor(i * ratio)]);
    }
    path = newPath;
  }

  // remove last path element
  // can not get vector from last path
  path.pop();

  path.forEach((p, i) => {
    console.log(p, i);
    updateField(p[0], p[1], 60);
  });

  console.log('done!', Date.now() - start);
  path = [];
  context.clearRect(0, 0, canvas.width, canvas.height);
});
document.addEventListener('mousedown', () => {canvas.mouseState = 'down'});
canvas.addEventListener('mousemove', (e) => {
  if (canvas.mouseState == 'down') {
    console.log(e.clientX, e.clientY, canvas.last);
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
    vecData[(last[0] + last[1] * canvas.width) * 3] = x - last[0];
    vecData[(last[0] + last[1] * canvas.width) * 3 + 1] = y - last[1];
    vecData[(last[0] + last[1] * canvas.width) * 3 + 2] = true;
  }
  canvas.last = [x, y];
  path.push([x, y]);
  console.log('push');
}

function updateField(x, y, range) {
  let base = (x + y * canvas.width) * 3;
  let origin = [
    vecData[base],
    vecData[base + 1],
    vecData[base + 2]
  ];
  console.log(base, origin);
  for (let d = 1; d < range; d++) {
    let vec = [
      origin[0] * (range - d) / range,
      origin[1] * (range - d) / range,
    ];
    for (let i = -1 * d; i <= d; i++) {
      for (let j = -1 * d; j <= d; j++) {
        let base = (x + i + (y + j) * canvas.width) * 3;
        let data = [
          vecData[base],
          vecData[base + 1],
          vecData[base + 2],
        ];
        if (data[0] == undefined || data[2]) continue;
        vecData[base] = data[0] + vec[0];
        vecData[base + 1] = data[1] + vec[1];
        vecData[base + 2] = 0;
      }
    }
  }
}

export default vecData;
