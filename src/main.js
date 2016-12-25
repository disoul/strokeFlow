/*
 * app.js
 * Copyright (C) 2016 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import './postcss/index.css';
import vecData from './getVec';
import Flow from './flow';


console.log(vecData);
document.write(
  '<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':35729/livereload.js?snipver=1"></script>'
);

let flow = new Flow(document.getElementById('container'), 10000);

document.getElementById('enter').addEventListener('click', e => {
  flow.render(vecData);
});
