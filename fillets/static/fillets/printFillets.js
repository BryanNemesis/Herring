var filletsElement = document.querySelector('#fillets')

var xhr = new XMLHttpRequest(),
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