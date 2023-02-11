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

enum Provider {
  Google = 1,
  Facebook = 2,
  Apple = 3,
}

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
  provider: Provider
  id?: string
  email?: string
  firstName?: string
  name?: string
  picture?: string
}

interface SignInCredentialsTotem {
  userName: string
  password: string
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

interface TotemType {
  descricao: string
  ativoTicket: boolean
  totemMobile: boolean
  ativarImpressora: boolean
  tipoImpressora: number
  modeloImpressora: number
  conexaoImpressora: string
  parametroImpressora: number
}

interface AuthContextData {
  user: User
  signIn: (credentials: SignInCredentialsTotem) => Promise<void>
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
      const [token, refreshToken, user, totem] = localStorage.multiGet([
        '@sao:token',
        '@sao:refreshToken',
        '@sao:user',
      ]);

      if (token[1] && refreshToken[1] && user[1]) {
        // api.defaults.headers.authorization = `Bearer ${token[1]}`;
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

  const signIn = useCallback(async (credentials: SignInCredentialsTotem) => {
    try {
      const response = await api.post('api/v1/users/login', credentials)

      if (response.data) {
        //console.log(response.data)
        const { token, refreshToken, user, totem } = response.data;
        
        if (!totem.totemMobile) {
          /* Toast.show({
            type: 'error',
            text1: 'Erro ao realizar o Login! 😞',
            text2: 'Esse usuário não possui acesso ao Totem Mobile.',
          }) */
          return
        }

        await localStorage.multiSet([
          ['@sao:token', token],
          ['@sao:refreshToken', JSON.stringify(refreshToken)],
          ['@sao:user', JSON.stringify(user)],
          ['@sao:totem', JSON.stringify(totem)],
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

      await localStorage.multiRemove([
        '@sao:token',
        '@sao:refreshToken',
        '@sao:user',
        '@sao:totem',
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

