import lookup from './lookup'

export function apiFilletCreate(newFillet, callback) {
  lookup('POST', '/fillets/create', callback, {text: newFillet})
}

export function apiFilletAction(filletId, action, callback) {
  const data = {id: filletId, action: action}
  lookup('POST', '/fillets/action', callback, data)
}

export function apiFilletList(callback) {
  lookup('GET', '/fillets', callback)
  }

export default apiFilletList
