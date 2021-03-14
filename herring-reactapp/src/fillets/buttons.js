import React from 'react';
import {apiFilletAction} from '../lookup'

function ActionButton({fillet, action, handlePerformAction, theme}) {
    const likeCount = fillet.like_count ? fillet.like_count : 0
    const className = `btn btn-outline-primary btn-sm ${theme}`
    const display = action.type === 'like' ? `${likeCount} ${action.display}` : action.display

    const handleActionBackendEvent = (response, status) => {
      if ((status === 200 || status === 201) && handlePerformAction) {
        handlePerformAction(response, status)
      }
    }
    const handleClick = (event) => {
      event.preventDefault()
      apiFilletAction(fillet.id, action.type, handleActionBackendEvent)
    }
  
    return <button className={className} onClick={handleClick}>{display}</button>
  }

export default ActionButton