import React from 'react'
import apiFilletCreate from '../lookup'

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

export default FilletCreateForm