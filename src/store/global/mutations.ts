export default {
  update(state: any, payload: [string, any]) {
    const [key, value] = payload
    state[key] = value
  }
}
