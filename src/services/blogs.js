import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async oldObject => {
  const config = {
    headers: { Authorization: token },
  }
  const newUrl = `${baseUrl}/${oldObject.id}`

  const response = await axios.put(newUrl, oldObject.data, config)
  return response.data
}

const remove = async removeBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const newUrl = `${baseUrl}/${removeBlog.id}`

  const response = await axios.delete(newUrl, config)
  return response.data
}

export default { getAll, create, setToken, put, remove }