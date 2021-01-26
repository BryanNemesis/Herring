var filletsElement = document.querySelector('#fillets')
var filletCreateElement = document.querySelector('#fillet-create-form')

loadFillets(filletsElement)
filletCreateElement.addEventListener('submit', handleFilletCreateFormSubmit)

function handleFilletCreateFormSubmit(event) {
    event.preventDefault()
    let xhr = new XMLHttpRequest(),
    myForm = event.target,
    url = myForm.getAttribute("action"),
    method = myForm.getAttribute("method"),
    myFormData = new FormData(myForm)

    // send a POST request to url /create-fillet, which fires up fillet_create_view and returns stuff
    // into xhr.response!!
    xhr.open(method, url)
    // this will make request.is_ajax() return True
    xhr.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest')
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhr.onload = function () {
        let serverResponse = xhr.response
        loadFillets(filletsElement)
        console.log(xhr.response)
    }
    xhr.send(myFormData)
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
      for (let i=listedItems.length-1; i>=0; i--) {
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