import axios from 'axios'

const BASE_URL_ON_SERVER = 'http://api:8080/api/v1'
const BASE_URL_ON_FRONT = 'http://localhost:8080/api/v1'

const isServer = typeof window === 'undefined'

const getBaseUrl = () => {
  if (isServer) return BASE_URL_ON_SERVER

  return BASE_URL_ON_FRONT
}

// const errorHandler = (error: AxiosError): Error => {
//   if (
//     error.response?.status === 404 &&
//     error.response.data.message === 'not initialized.'
//   ) {
//     Router.push('/initial')
//   }
//   return error
// }

const createAuthHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
})

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

export const postProfile = async (
  token: string,
  formData: { displayName: string },
) => {
  const headers = createAuthHeader(token)
  return axios.post(`${getBaseUrl()}/profile`, formData, { headers })
}
