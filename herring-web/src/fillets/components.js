import React, {useEffect, useState} from 'react';
import {apiFilletCreate, apiFilletList, apiFilletAction} from '../lookup'


function FilletsElement() {
  const [newFillets, setNewFillets] = useState([])

  return (
  <div className='col-12 mb-3'>
      <FilletCreateForm newFillets={newFillets} setNewFillets={setNewFillets} />
      <FilletList newFillets={newFillets} setNewFillets={setNewFillets} />
  </div>
  )
}

function FilletCreateForm({newFillets, setNewFillets}) {
  const textAreaRef = React.createRef()

  const handleSubmit = (event) => {
    // api request
    event.preventDefault()
    const enteredText = textAreaRef.current.value
    textAreaRef.current.value = ''
    apiFilletCreate(enteredText, handleBackendUpdate)
  }

  const handleBackendUpdate = (response, status) => {
    // api response handler
    if (status === 201) {
      const tempNewFillets = [...newFillets]
      tempNewFillets.unshift(response)
      setNewFillets(tempNewFillets)
    } else {
      alert('you have error :-D')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea className='form-control' required={true} ref={textAreaRef}>
      </textarea>
      <button type='submit' className='btn btn-outline-primary btn-sm my-3 btn-dark'>Post</button>
    </form>
  )
}

function FilletList({newFillets, setNewFillets}) {
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
      apiFilletList(handleFilletListLookup)
    }
  }, [filletsInit, filletsDidSet])

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

function ActionButton({fillet, action, handlePerformAction, theme}) {
  const likeCount = fillet.like_count ? fillet.like_count : 0
  const className = `btn btn-outline-primary btn-sm ${theme}`
  const display = action.type === 'like' ? `${likeCount} ${action.display}` : action.display

  const handleActionBackendEvent = (response, status) => {
    console.log(status, response)
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

export default FilletsElement