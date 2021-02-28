import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {FilletsComponent, FilletFeedComponent, FilletDetailComponent} from './fillets'
import {ProfileBadgeComponent} from './profiles'

const e = React.createElement

const herringElement = document.getElementById('herring')
if (herringElement) {
  ReactDOM.render(
    e(FilletsComponent, herringElement.dataset), herringElement)
}

const herringFeedElement = document.getElementById('herring-feed')
if (herringFeedElement) {
  ReactDOM.render(
    e(FilletFeedComponent, herringFeedElement.dataset), herringFeedElement)
}

const filletDetailElements = document.querySelectorAll('.herring-detail')
filletDetailElements.forEach(container => {
  ReactDOM.render(
    e(FilletDetailComponent, container.dataset), container)
})

const profileBadgeElements = document.querySelectorAll('.herring-profile-badge')
profileBadgeElements.forEach(container => {
  ReactDOM.render(
    e(ProfileBadgeComponent, container.dataset), container)
})