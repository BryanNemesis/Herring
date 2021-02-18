import lookup from './lookup'

export function apiFilletCreate(newFillet, callback) {
  lookup('POST', '/fillets/create/', callback, {text: newFillet})
}

export function apiFilletAction(filletId, action, callback) {
  const data = {id: filletId, action: action}
  lookup('POST', '/fillets/action/', callback, data)
}

export function apiFilletList(username, callback) {
  let endpoint = '/fillets'
  if (username) {
    endpoint += `/?username=${username}`
  }
  lookup('GET', endpoint, callback)
}

export function apiFilletDetail(filletId, callback) {
  lookup('GET', `/fillets/${filletId}/`, callback)
}

export default apiFilletList
