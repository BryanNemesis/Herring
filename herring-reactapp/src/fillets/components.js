import {React, useEffect, useState} from 'react'
import FilletList from './list'
import FilletFeedList from './feed'
import FilletCreateForm from './form'
import {apiFilletDetail} from '../lookup'
import Fillet from './detail'


export function FilletsComponent({username, userCanPost}) {
  const [newFillets, setNewFillets] = useState([])
  userCanPost = userCanPost === 'true' ? true : false

  return (
  <div className='col-12 mb-3'>
      {userCanPost &&
      <FilletCreateForm newFillets={newFillets} setNewFillets={setNewFillets} />}
      <FilletList newFillets={newFillets} setNewFillets={setNewFillets} username={username} />
  </div>
  )
}

export function FilletFeedComponent({username, userCanPost}) {
  const [newFillets, setNewFillets] = useState([])
  userCanPost = userCanPost === 'true' ? true : false

  return (
  <div className='col-12 mb-3'>
      {userCanPost &&
      <FilletCreateForm newFillets={newFillets} setNewFillets={setNewFillets} />}
      <FilletFeedList newFillets={newFillets} setNewFillets={setNewFillets} username={username} />
  </div>
  )
}

export function FilletDetailComponent({filletId}) {
  const [didLookup, setDidLookup] = useState(false)
  const [fillet, setFillet] = useState(null)

  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      setFillet(response)
    } else {
      alert('Error: could not find fillet.')
    }
  }

  useEffect(() => {
    if (didLookup === false) {
      apiFilletDetail(filletId, handleBackendLookup)
      setDidLookup(true)
    }

  }, [didLookup, setDidLookup, filletId])

  return fillet === null ? null : <Fillet fillet={fillet} handleRepost={() => {}}/>
}

export default FilletsComponent