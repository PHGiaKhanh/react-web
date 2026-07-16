let apiRoot = ''

console.log('import.meta.env:', import.meta.env)
console.log('process.env:', process.env)

if (process.env.NODE_ENV === 'dev') {
  apiRoot = 'http://localhost:8017'
}
if (process.env.NODE_ENV === 'production') {
  apiRoot = 'https://trello-api-rlii.onrender.com'
}

console.log('apiRoot:', apiRoot)
export const API_ROOT= apiRoot
//export const API_ROOT='http://localhost:8017'