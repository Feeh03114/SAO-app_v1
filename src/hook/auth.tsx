import React, {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  /// eslint-disable-next-line prettier/prettier
  useState,
} from 'react'
import api from '../service/api'

interface RefreshToken {
  id: string
  userId: string
  expiresIn: number
}

interface AuthState {
  token: string
  refreshToken: RefreshToken
  user: User
  menuUser: MenuUserProps[]
}

interface MenuUserProps{
  namePage: string;
  url: string;
  icon: string;
  isEdit: boolean;
  isDelete: boolean;
  isCreate: boolean;
  isRead: boolean;
}

interface SignInCredentials {
  ru: string
  password: string
  remember_me: boolean
}

interface User {
  id: string
  email: string
  nomeUsuario: string
  userName: string
  avatar: string
  solicitaPagto: boolean
  cpf?: string
  phoneNumber?: string
  statementofresponsibility?: boolean
}

interface AuthContextData {
  menu: MenuUserProps[]
  user: User
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  loading: boolean
  setLoading: Dispatch<React.SetStateAction<boolean>>
  setData: (e: AuthState) => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const remember_me = localStorage.getItem('@sao:remember_me')|| 'false'
      const token = localStorage.getItem('@sao:token')
      const refreshToken = localStorage.getItem('@sao:refreshToken')
      const user = localStorage.getItem('@sao:user')
      
      if(remember_me.toLowerCase() !== 'true') {
        localStorage.removeItem('@sao:remember_me')
        localStorage.removeItem('@sao:token')
        localStorage.removeItem('@sao:refreshToken')
        localStorage.removeItem('@sao:user')
        setLoading(false)
        return
      }

      if (!(token && refreshToken && user)){
        setLoading(false)
        return;
      }

      const {data: dataMenu} = await api.get('api/v1/application/menu')

      setData({
        token: token || '',
        refreshToken: JSON.parse(refreshToken || ''),
        user: JSON.parse(user || ''),
        menuUser: dataMenu||[]
      })
    }

    loadStoragedData()
  }, [])

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    try {
      const response = await api.post('api/v1/users/login', credentials)
      if (response.data) {
        const { token, refreshToken, user } = response.data;
        localStorage.setItem('@sao:remember_me', credentials.remember_me.toString())
        localStorage.setItem('@sao:token', token)
        localStorage.setItem('@sao:refreshToken', JSON.stringify(refreshToken))
        localStorage.setItem('@sao:user', JSON.stringify(user))

        const {data: dataMenu} = await api.get('api/v1/application/menu')

        setData({ token, refreshToken, user, menuUser: dataMenu||[] })
      }
    } catch (err: any) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    // if (Platform.OS !== 'ios') {
    try {
      const jsonRefreshToken = localStorage.getItem('@sao:refreshToken')
      const refreshToken = JSON.parse(jsonRefreshToken || '')
      await api.post('api/v1/users/logout', {
        refreshToken: refreshToken.id,
      })

      localStorage.removeItem('@sao:remember_me')
      localStorage.removeItem('@sao:token')
      localStorage.removeItem('@sao:refreshToken')
      localStorage.removeItem('@sao:user')
      setData({} as AuthState)
    } catch (err) {
      console.log(err)
    }
    //
  }, [])

  return (
    <AuthContext.Provider
      value={{
        menu: data.menuUser,
        user: data.user,
        signIn,
        signOut,
        loading,
        setLoading,
        setData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }

