import { UserDTO } from "@dtos/UserDTO";
import { ReactNode, createContext, useState } from "react";

export type AuthContextDataProps = {
    user: UserDTO
    sigIn: (email: string, password: string) => void
}

type AuthContextProviderProps ={
    children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({
    id: '1',
    name: 'Diego Batista',
    email: 'diego@teste.com',
    avatar: 'diego.png'
  })

  function sigIn(email: string, password: string) {
    setUser({
      id: '',
      name: '',
      email,
      avatar: '',
    })
  }

    return (
      <AuthContext.Provider value={{ user, sigIn }}>
        {children}
      </AuthContext.Provider>
    )
}