import React from 'react';
import ReactDOM from 'react-dom';
import {FilletsComponent, FilletDetailComponent} from './fillets'

const e = React.createElement

const herringElement = document.getElementById('herring')
if (herringElement) {
  ReactDOM.render(
    e(FilletsComponent, herringElement.dataset), herringElement)
}

const filletDetailElements = document.querySelectorAll('.herring-detail')
filletDetailElements.forEach(container => {
  ReactDOM.render(
    e(FilletDetailComponent, container.dataset), container)
})
