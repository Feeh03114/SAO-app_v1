import axios from 'axios';
import { getSession } from 'next-auth/react';

//import env from '../lib/env';
const api = axios.create({
  baseURL:  process.env.NEXT_PUBLIC_URL_BACKEND || `https://backend-odonto.labprivate.cloud/`,
  //withCredentials: true,
/*   headers: {
    "ngrok-skip-browser-warning":"any"
  }, */
})

/* let isRefreshing = false
let failedRequestsQueue: {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError) => void
}[] = []
 */
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

export default api
