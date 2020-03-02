import axios from 'axios'

const BASE_URL_ON_SERVER = 'http://api:8080/api/v1'
const BASE_URL_ON_FRONT = 'http://localhost:8080/api/v1'
const FRONT_SERVER_URL = 'http://localhost:3001'

export const doLogin = async (token: string) => {
  return axios.post<{ status: string; message: string }>(
    `${FRONT_SERVER_URL}/login`,
    { token },
  )
}

export const doLogout = async () => {
  await axios.post<{ status: string; message: string }>(
    `${FRONT_SERVER_URL}/logout`,
  )
}

const isServer = typeof window === 'undefined'

const getBaseUrl = () => {
  if (isServer) return BASE_URL_ON_SERVER

  return BASE_URL_ON_FRONT
}

export const getPrivateMessage = async (token: string) => {
  console.log('isServer: ', isServer)

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
