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
  let formattedFilletElement = "<div class='mb-4 fillet' id='fillet-" + fillet.id + "'><p>" + fillet.text + "</p></div>"

  return formattedFilletElement
}