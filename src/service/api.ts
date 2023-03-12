import axios, { AxiosError } from 'axios'
//import env from '../lib/env';

const api = axios.create({
  baseURL: 'http://192.168.1.38:3001',
})

let isRefreshing = false
let failedRequestsQueue: {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError) => void
}[] = []

api.interceptors.request.use(
    (config) => {
    const token = localStorage.getItem('@sao:token')
    if (token) {
      config!.headers!.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    console.error('Axios interceptor: ', error)
  }
)

api.interceptors.response.use(
  response => {
    return response
  },
  async (error: any) => {
    if (error.response?.status === 401) {
        console.log('error.response?.code', error.response)
      if (error.response?.data?.code === 'token.expired') {
        const originalConfig = error.config

        if (!isRefreshing) {
          isRefreshing = true

          const jsonRefreshToken =  localStorage.getItem('@sao:refreshToken')
          const localStorageuser = localStorage.getItem('@sao:user')

          if (jsonRefreshToken && localStorageuser) {
            const {ru} = JSON.parse(localStorageuser)

            api
              .post(`api/auth/validate-refreshtoken/${jsonRefreshToken}/${ru}`)
              .then(async response => {
                const { token, refreshToken: newRefreshToken } = response.data
                localStorage.setItem('@sao:token', token)

                if (newRefreshToken) {
                    localStorage.setItem('@sao:refreshToken', JSON.stringify(newRefreshToken))
                }

                failedRequestsQueue.forEach(request => request.onSuccess(token))
                failedRequestsQueue = []
              })
              .catch(err => {
                failedRequestsQueue.forEach(request => request.onFailure(err))
                failedRequestsQueue = []
              })
              .finally(() => {
                isRefreshing = false
              })
          }
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig!.headers!.Authorization = `Bearer ${token}`

              resolve(originalConfig)
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      }
    }

    console.error('Error:', error)
    return Promise.reject(error)
  }
)

export default api
