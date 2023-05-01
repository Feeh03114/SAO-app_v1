import axios, { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

//import env from '../lib/env';
const api = axios.create({
  baseURL:  `http://localhost:3001`,
  //withCredentials: true,
})

let isRefreshing = false
let failedRequestsQueue: {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError) => void
}[] = []

api.interceptors.request.use(
  async (config: any): Promise<any> => {
    const session: any = await getSession();   
    if (session) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config; 
  },
  (error) => {
    console.error('Axios interceptor Authorization: ', error);
  }
);

api.interceptors.request.use(
  async (config) => {
    const session: any = await getSession();
    if (session) {
      config!.headers["idUser"] = session.user.id;
    }
    return config
  },
  error => {
    console.error('Axios interceptor: ', error)
  }
)

/* api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session) {
    config.headers.Cookie = session;
  }
  return config;
}); */

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Verifica se a sessão expirou e se o erro é 401
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Atualiza o token de acesso usando o refreshToken do NextAuth.js
      const session = await getSession();
      const newAccessToken = await refreshAccessToken(session);
      if (newAccessToken) {
        // Atualiza o cabeçalho Authorization com o novo token de acesso
        originalRequest.headers.Authorization = `Bearer ${newAccessToken.accessToken}`;
        // Reenvia a solicitação original com o novo token de acesso
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

async function refreshAccessToken(session:any) {
  const { data }:any = await api
    .get(`/api/auth/validate-refreshtoken/${session.refreshToken}/${session.user.ru}`);

  if (!data || !data.accessToken) {
    // Se o token de atualização expirou, o usuário será redirecionado para a página de login
    return null;
  }

  return data;
}

export default api
