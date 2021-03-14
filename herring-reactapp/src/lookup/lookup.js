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

function lookup(method, endpoint, callback, data) {
    let jsonData
    if (data) {
      jsonData = JSON.stringify(data)
    }
    const xhr = new XMLHttpRequest()
    const url = `http://localhost:8000/api${endpoint}`
    xhr.responseType = 'json'
    xhr.open(method, url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    const csrftoken = getCookie('csrftoken')
    xhr.setRequestHeader('X-CSRFToken', csrftoken)
    // const sessionid = getCookie('sessionid')
    // xhr.setRequestHeader('X-SessionID', sessionid)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    // xhr.withCredentials = true
    xhr.onload = () => {
      if (xhr.status === 403) {
        if (xhr.response.detail === 'Authentication credentials were not provided.') {
          if (window.location.href.indexOf('login') === -1) {
            window.location.href = '/login?showLoginRequired=true'
          }
        }
      }

      callback(xhr.response, xhr.status)
    }
    xhr.onerror = (e) => {
      callback({'message': 'Request failed'}, 400)
    }
    xhr.send(jsonData)
  }

export default lookup