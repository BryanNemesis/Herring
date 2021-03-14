import React, {useEffect, useState} from 'react'
import {apiFilletFeed} from '../lookup'
import Fillet from './detail'

export function FilletFeedList({newFillets, setNewFillets, username}) {
    const [fillets, setFillets] = useState([])
    const [filletsInit, setFilletsInit] = useState(newFillets ? newFillets : [])
    const [filletsDidSet, setFilletsDidSet] = useState(false)
    const [nextUrl, setNextUrl] = useState(null)
    
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
            setNextUrl(response.next)
            setFilletsInit(response.results)
            setFilletsDidSet(true)
          }
        }
        apiFilletFeed(handleFilletListLookup)
      }
    }, [filletsInit, filletsDidSet, username])
  
    const handleRepost = (newFillet) => {
      const tempNewFillets = [...newFillets]
      tempNewFillets.unshift(newFillet)
      setNewFillets(tempNewFillets)
    }
  
    const handleLoadNext = (event) => {
      event.preventDefault()
      if (nextUrl !== null) {
        const handleLoadNextReponse = (response, status) => {
          if (status === 200)
          {
            setNextUrl(response.next)
            const newFillets = [...fillets].concat(response.results)
            setFillets(newFillets)
            setFilletsInit(newFillets)
          } else {
            alert('You have error :-D')
          }
        }
        apiFilletFeed(handleLoadNextReponse, nextUrl)
      }
    }

    return (
      <> 
        {fillets.map((x) => {
          return <><Fillet 
          fillet={x}
          handleRepost={handleRepost}
          key={x.id} />
          <hr></hr></>
        })}
        {nextUrl !== null &&
        <button
        onClick={handleLoadNext}
        className='btn btn-outline-primary btn-sm btn-dark'>
          More
        </button>}
      </>
    )
  }
  

export default FilletFeedList