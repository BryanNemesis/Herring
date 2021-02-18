import {React, useState} from 'react'
import ActionButton from './buttons'

function Fillet({fillet, handleRepost}) {
    const text = fillet.text ? fillet.text : 'reposted'
    const filletTextClassName = fillet.is_repost ? 'px-3 text-muted small' : 'px-3'
    const [currentFillet, setCurrentFillet] = useState(fillet ? fillet : null)
  
    const handlePerformAction = (newFillet, status) => {
      if (status === 200) {
        setCurrentFillet(newFillet)
      } else if (status === 201) {
        handleRepost(newFillet)
      }
    }
  
    return <div className='col-12 col-md-10 mx-auto border rounded py-2 mb-4'>
      <div>
        <p className={filletTextClassName}>
          <i>{fillet.id}:</i> {text}
        </p>
        {fillet.is_repost &&
        <div className='col-9'><Fillet fillet={currentFillet.parent} handleRepost={handleRepost}/></div>}
      </div>
      {currentFillet && <div className='btn btn-group'>
        <ActionButton
          fillet={currentFillet}
          action={{type: 'like', display: 'Likes'}}
          handlePerformAction={handlePerformAction}
          theme='btn-dark'
        />
        <ActionButton
          fillet={currentFillet}
          action={{type: 'unlike', display: 'Unlike'}}
          handlePerformAction={handlePerformAction}
          theme='btn-dark'
        />
        <ActionButton
          fillet={currentFillet}
          action={{type: 'repost', display: 'Repost'}}
          handlePerformAction={handlePerformAction}
          theme='btn-light'
        />
      </div>}
    </div>
  }

export default Fillet