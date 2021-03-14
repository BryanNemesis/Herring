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
            if (errorJson.text) {
                handleFilletFormError(errorJson.text[0], true)
            }
            else {
                handleFilletFormError('Could not post fillet. Please try again.', true)
            }
        } else if (xhr.status === 403) {
            handleFilletFormError('Please log in to post a fillet.', true)
        } else if (xhr.status === 500) {
            handleFilletFormError('A server error occured. Please try again.', true)
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
    url = '/api/fillets',
    responseType = 'json'

    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
      let serverResponse = xhr.response
      let listedItems = serverResponse
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
    + likeButton(fillet) + unlikeButton(fillet) + repostButton(fillet) + "</div></div>"
}

function likeButton(fillet) {
    // correct this, unreadable
    return '<button class="btn btn-primary btn-sm bg-herring-light" onclick="handleFilletAction('
     + fillet.id + ',' + fillet.like_count + ",'like')\">" + fillet.like_count + ' Likes</button>'
}

function unlikeButton(fillet) {
    // correct this, unreadable
    return '<button class="btn btn-outline-primary btn-sm outline-herring-light" onclick="handleFilletAction('
     + fillet.id + ',' + fillet.like_count + ",'unlike')\">" + 'Unlike</button>'
}

function repostButton(fillet) {
    // correct this, unreadable
    return '<button class="btn btn-outline-primary btn-sm outline-herring-light" onclick="handleFilletAction('
     + fillet.id + ',' + fillet.like_count + ",'repost')\">" + 'Repost</button>'
}

function handleFilletAction(filletId, likeCount, action) {
    let url = "/api/fillets/action"
    let method = 'POST'
    data = JSON.stringify({
        id: filletId,
        action: action
    })
    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest')
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    var csrftoken = getCookie('csrftoken')
    xhr.setRequestHeader('X-CSRFToken', csrftoken)
    xhr.onload = function() {
        loadFillets(filletsContainerElement)
    }
    xhr.send(data)
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
