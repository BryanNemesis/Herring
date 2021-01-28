var filletsContainerElement = document.querySelector('#fillets')
var filletCreateElement = document.querySelector('#fillet-create-form')

loadFillets(filletsContainerElement)
filletCreateElement.addEventListener('submit', handleFilletCreateFormSubmit)

function handleFilletCreateFormSubmit(event) {
    event.preventDefault()
    let xhr = new XMLHttpRequest(),
    myForm = event.target,
    url = myForm.getAttribute("action"),
    method = myForm.getAttribute("method"),
    myFormData = new FormData(myForm),
    responseType = 'json'

    // send a POST request to url /create-fillet, which fires up fillet_create_view and returns stuff
    // into xhr.response!!
    xhr.responseType = responseType
    xhr.open(method, url, responseType)
    // this will make request.is_ajax() return True
    xhr.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest')
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhr.onload = function () {
        if (xhr.status === 201) {
            handleFilletFormError('', false)
            let newFilletJson = xhr.response
            let newFilletElement = formatFilletElement(newFilletJson)
            let originalHtml = filletsContainerElement.innerHTML
            filletsContainerElement.innerHTML = newFilletElement + originalHtml
            myForm.reset()
        } else if (xhr.status === 400) {
            errorJson = xhr.response
            if (errorJson.text[0]) {
                handleFilletFormError(errorJson.text[0], true)
            }
            else {
                alert("Could not post fillet. Please try again")
            }
        } else if (xhr.status === 500) {
            alert("A server error occured. Please try again")
        }
    }
    xhr.send(myFormData)
}

function handleFilletFormError(msg, display) {
    let errorDiv = document.querySelector('#fillet-create-form-error')
    if (display === true) {
        errorDiv.setAttribute('class', 'alert alert-danger')
        errorDiv.innerHTML = msg
    } else {
        errorDiv.setAttribute('class', 'd-none alert alert-danger')
    }
}

function loadFillets(filletsElement) {
    let xhr = new XMLHttpRequest(),
    method = 'GET',
    url = '/fillets',
    responseType = 'json'

    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
      let serverResponse = xhr.response
      let listedItems = serverResponse.response
      let finalFilletStr = ''
      for (let i=0; i<listedItems.length; i++) {
          finalFilletStr += formatFilletElement(listedItems[i])
        }
      filletsElement.innerHTML = finalFilletStr
    }
    xhr.send()
}

function formatFilletElement(fillet) {
  return "<div class='col-12 col-md-10 mx-auto border rounded py-3 mb-4 fillet' id='fillet-"
    + fillet.id + "'><p>"
    + fillet.text + "</p><div class='btn-group'>"
    + likeButton(fillet) + "</div></div>"
}

function likeButton(fillet) {
    return "<button class='btn btn-primary btn-sm bg-herring-light' onclick='handleLiked("
     + fillet.id + ", "
     + fillet.like_count + ")'>" + fillet.like_count + " Likes</button>"
}

function handleLiked(filletId, likeCount) {
    console.log("Fillet no " + filletId + " has " + likeCount + " likes")
}