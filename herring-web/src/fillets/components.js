import {React, useState} from 'react'
import FilletList from './list'
import FilletCreateForm from './form'


function FilletsElement({dataset}) {
  const [newFillets, setNewFillets] = useState([])
  const userCanPost = dataset.userCanPost === 'true' ? true : false

  return (
  <div className='col-12 mb-3'>
      {userCanPost &&
      <FilletCreateForm newFillets={newFillets} setNewFillets={setNewFillets} userCanPost={userCanPost} />}
      <FilletList newFillets={newFillets} setNewFillets={setNewFillets} username={dataset.username} />
  </div>
  )
}

export default FilletsElement