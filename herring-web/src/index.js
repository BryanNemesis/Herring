import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {FilletsComponent, FilletDetailComponent} from './fillets'


const e = React.createElement


const appElement = document.getElementById('root')
if (appElement) {
  ReactDOM.render(e(App, appElement.dataset), appElement)
}

const herringElement = document.getElementById('Herring')
if (herringElement) {
  ReactDOM.render(
    e(FilletsComponent, herringElement.dataset), herringElement)
}

const filletDetailElements = document.querySelectorAll('.herring-detail')
filletDetailElements.forEach(container => {
  ReactDOM.render(
    e(FilletDetailComponent, container.dataset), container)
})
