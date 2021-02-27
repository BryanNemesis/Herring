import {React, useState} from 'react'
import ActionButton from './buttons'
import {UserPicture, UserDisplay} from '../profiles'

function Fillet({fillet, handleRepost}) {
    const text = fillet.text ? fillet.text : ''
    const filletDisplayPostfix  = fillet.text ? ' said:' : ' reposted:'
    const [currentFillet, setCurrentFillet] = useState(fillet ? fillet : null)
    const path = window.location.pathname
    const match = path.match(/(?<filletId>\d+)/)
    const urlFilletId = match ? match.groups.filletId : 0
    const isDetail = `${urlFilletId}` === `${fillet.id}`
  
    const handlePerformAction = (newFillet, status) => {
      if (status === 200) {
        setCurrentFillet(newFillet)
      } else if (status === 201) {
        handleRepost(newFillet)
      }
    }
  
    const handleLink = (event) => {
      event.preventDefault()
      window.location.href = `/${fillet.id}`
    }

    return (
      <div className='col-12 col-md-10 mx-auto border rounded py-3 mb-3'>
        <div className='px-3 text-muted small'>
          <UserPicture username={fillet.user.username}></UserPicture>&nbsp;
          <UserDisplay user={fillet.user} includeFullName></UserDisplay>{filletDisplayPostfix}
        </div>
        <p className='px-4 my-3'>
          <b>{text}</b>
        </p>
        {fillet.is_repost &&
        <div className='col-9'><Fillet fillet={currentFillet.parent} handleRepost={handleRepost}/></div>}
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
          {!isDetail && <button onClick={handleLink} className='btn btn-outline-primary btn-sm btn-light'>View</button>}
        </div>}
      </div>
    )
  }

export default Fillet