import lookup from './lookup'

export function apiFilletCreate(newFillet, callback) {
  lookup('POST', '/fillets/create/', callback, {text: newFillet})
}

export function apiFilletAction(filletId, action, callback) {
  const data = {id: filletId, action: action}
  lookup('POST', '/fillets/action/', callback, data)
}

export function apiFilletList(username, callback, nextUrl) {
  let endpoint = '/fillets'
  if (username) {
    endpoint += `/?username=${username}`
  }
  if (nextUrl) {
    endpoint = nextUrl.replace('http://localhost:8000/api', '')
  }
  lookup('GET', endpoint, callback)
}

export function apiFilletFeed(callback, nextUrl) {
  let endpoint = '/fillets/feed'
  if (nextUrl) {
    endpoint = nextUrl.replace('http://localhost:8000/api', '')
  }
  lookup('GET', endpoint, callback)
}

export function apiFilletDetail(filletId, callback) {
  lookup('GET', `/fillets/${filletId}/`, callback)
}

export function apiProfileDetail(username, callback) {
  lookup('GET', `/profiles/${username}/`, callback)
}

export function apiProfileFollowToggle(username, callback, action) {
  const data = {action: action.toLowerCase()}
  lookup('POST', `/profiles/${username}/follow/`, callback, data)
}

export default apiFilletList
