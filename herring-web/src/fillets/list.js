import React, {useEffect, useState} from 'react'
import {apiFilletList} from '../lookup'
import Fillet from './detail'

function FilletList({newFillets, setNewFillets, username}) {
    const [fillets, setFillets] = useState([])
    const [filletsInit, setFilletsInit] = useState(newFillets ? newFillets : [])
    const [filletsDidSet, setFilletsDidSet] = useState(false)
    
    useEffect(() => {
      let finalFillets = [...newFillets].concat(filletsInit)
      if (finalFillets.length !== fillets.length) {
        setFillets(finalFillets)
      }
    }, [fillets, newFillets, filletsInit])
  
    useEffect(() => {
      if (!filletsDidSet) {
        const handleFilletListLookup = (response, status) => {
          if (status === 200)
          {
            setFilletsInit(response)
            setFilletsDidSet(true)
          } else {
            alert('You have error :-D')
          }
        }
        apiFilletList(username, handleFilletListLookup)
      }
    }, [filletsInit, filletsDidSet, username])
  
    const handleRepost = (newFillet) => {
      const tempNewFillets = [...newFillets]
      tempNewFillets.unshift(newFillet)
      setNewFillets(tempNewFillets)
    }
  
    return (
      <div> 
          {fillets.map((x) => {
            return <Fillet 
            fillet={x}
            handleRepost={handleRepost}
            key={x.id} />
          })}
      </div>
    )
  }
  

export default FilletList