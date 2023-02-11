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
  token: string
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
      const [remember_me, token, refreshToken, user] = localStorage.multiGet([
        '@sao:remember_me',
        '@sao:token',
        '@sao:refreshToken',
        '@sao:user',
      ]);

      if(remember_me[1].toLowerCase() === 'true') localStorage.multiRemove([
        '@sao:remember_me',
        '@sao:token',
        '@sao:refreshToken',
        '@sao:user',
      ])

      if (token[1] && refreshToken[1] && user[1] && remember_me[1].toLowerCase() === 'false') {
        setData({
          token: token[1] || '',
          refreshToken: JSON.parse(refreshToken[1] || ''),
          user: JSON.parse(user[1] || ''),
        })
      }

      setLoading(false)
    }

    loadStoragedData()
  }, [])

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    try {
      const response = await api.post('api/v1/users/login', credentials)
      if (response.data) {
        const { token, refreshToken, user } = response.data;
        localStorage.multiSet([
          ['@sao:remember_me', credentials.remember_me.toString()],
          ['@sao:token', token],
          ['@sao:refreshToken', JSON.stringify(refreshToken)],
          ['@sao:user', JSON.stringify(user)],
        ])
        setData({ token, refreshToken, user })
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
      const jsonRefreshToken = await localStorage.getItem('@sao:refreshToken')
      const refreshToken = JSON.parse(jsonRefreshToken || '')
      await api.post('api/v1/users/logout', {
        refreshToken: refreshToken.id,
      })

      localStorage.multiRemove([
        '@sao:remember_me',
        '@sao:token',
        '@sao:refreshToken',
        '@sao:user',
      ])

      setData({} as AuthState)
    } catch (err) {
      console.log(err)
    }
    //
  }, [])

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
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

