import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { userStorageGet, userStorageSave } from "@storage/storageUser";
import { ReactNode, createContext, useEffect, useState } from "react";

export type AuthContextDataProps = {
    user: UserDTO
    sigIn: (email: string, password: string) => Promise<void>
}

type AuthContextProviderProps ={
    children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  async function sigIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password})

      if(data.user) {
        setUser(data.user)
        userStorageSave(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    const userLogged = await userStorageGet()

    if(userLogged){
      setUser(userLogged)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

    return (
      <AuthContext.Provider value={{ user, sigIn }}>
        {children}
      </AuthContext.Provider>
    )
}