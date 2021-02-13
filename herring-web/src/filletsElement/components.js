import React, {useEffect, useState} from 'react';
import loadFillets from '../lookup'


function FilletsElement() {
  const textAreaRef = React.createRef()
  const [newFillets, setNewFillets] = useState([])

  const handleSubmit = (event) => {
      event.preventDefault()
      const newValue = textAreaRef.current.value
      textAreaRef.current.value = ''
      let tempNewFillets = [...newFillets]
      tempNewFillets.unshift({
          text: newValue,
          likeCount: 0,
          id: 666
      })
      setNewFillets(tempNewFillets)
  }

  return (
  <div className='col-12 mb-3'>
      <form onSubmit={handleSubmit}>
          <textarea className='form-control' required={true} ref={textAreaRef}>

          </textarea>
          <button type='submit' className='btn btn-outline-primary btn-sm my-3 btn-dark'>Post</button>
      </form>
      <FilletsList newFillets={newFillets}/>
  </div>
  )
}

function ActionButton({fillet, action, theme}) {
  const [likeCount, setLikeCount] = useState(fillet.like_count ? fillet.like_count : 0)
  const [liked, setLiked] = useState(fillet.userLike ? true : false)
  const className = `btn btn-outline-primary btn-sm ${theme}`
  const display = action.type === 'like' ? `${likeCount} ${action.display}` : action.display

    const handleClick = (event) => {
      event.preventDefault()
      if (action.type === 'like') {
        if (!liked) {
          setLikeCount(likeCount + 1)
        } else {
          setLikeCount(likeCount - 1)
        }
        setLiked(!liked)
      }
    }
    return <button className={className} onClick={handleClick}>{display}</button>
  }
  
function Fillet({fillet}) {
    const text = fillet.text ? fillet.text : 'Empty fillet'

    return <div className='col-12 col-md-10 mx-auto border rounded py-2 mb-4'>
      <p className='px-3'>
        {text}
      </p>
      <div className='btn btn-group'>
        <ActionButton
          fillet={fillet}
          action={{type: 'like', display: 'Likes'}}
          theme='btn-dark'
        />
        <ActionButton
          fillet={fillet}
          action={{type: 'repost', display: 'Repost'}}
          theme='btn-light'
        />
      </div>
    </div>
  }
  
  function FilletsList({newFillets}) {
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
        const myCallback = (response, status) => {
          if (status === 200)
          {
            setFilletsInit(response)
            setFilletsDidSet(true)
          } else {
            alert('Error :D')
          }
        }
        loadFillets(myCallback)
      }
  
    }, [filletsInit, filletsDidSet])
  
    return (
      <div> 
          
          {fillets.map((x, i) => {
            return <Fillet fillet={x} key={i} />
          })}
      </div>
    )
  }

  export default FilletsElement