import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

const colors = ['red', 'green', 'blue', 'yellow', 'orange'];
let index = 0;
console.clear();
setInterval(() => {
  if (index + 1 > colors.length - 1) {
    index = 0;
  } else {
    index += 1;
  }

  // console.clear();
  console.log(
    '%cWordを使うな、LaTeXを使え。',
    `font-size: 300%; color: ${colors[index]}; font-weight: bold;`
  );
}, 100)

registerServiceWorker();
