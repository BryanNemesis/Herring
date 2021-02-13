function lookup(method, endpoint, callback, data) {
  let jsonData
  if (data) {
    jsonData = JSON.stringify(data)
  }
  const xhr = new XMLHttpRequest()
  const url = `http://localhost:8000/api${endpoint}`
  xhr.responseType = 'json'
  xhr.open(method, url)
  xhr.onload = () => {
    callback(xhr.response, xhr.status)
  }
  xhr.onerror = (e) => {
    callback({'message': 'Request failed'}, 400)
  }
  xhr.send(jsonData)
}

function loadFillets(callback) {
  lookup('GET', '/fillets', callback)
  }

export default loadFillets