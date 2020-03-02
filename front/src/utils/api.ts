import axios from 'axios'

const BASE_URL_ON_SERVER = 'http://api:8080/api/v1'
const BASE_URL_ON_FRONT = 'http://localhost:8080/api/v1'

const isServer = typeof window === 'undefined'

const getBaseUrl = () => {
  if (isServer) return BASE_URL_ON_SERVER

  return BASE_URL_ON_FRONT
}

export const getPrivateMessage = async (token: string) => {
  return axios.get<{ message: string }>(`${getBaseUrl()}/private`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const fetchHello = async () => {
  const resp = await axios.get<{ message: string }>(`${getBaseUrl()}/hello`)

  return resp.data
}
