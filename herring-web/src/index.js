import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const herringElement = document.getElementById('Herring')

console.log(herringElement.dataset)

ReactDOM.render(
  <React.StrictMode>
    <App dataset={herringElement.dataset} />
  </React.StrictMode>,
  herringElement
);

