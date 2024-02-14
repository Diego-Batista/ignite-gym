import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { userStorageGet, userStorageSave } from "@storage/storageUser";
import { ReactNode, createContext, useEffect, useState } from "react";

export type AuthContextDataProps = {
    user: UserDTO
    sigIn: (email: string, password: string) => Promise<void>
    isLoadingUserStorageData: boolean
}

type AuthContextProviderProps ={
    children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

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
    try {
      const userLogged = await userStorageGet()
  
      if(userLogged){
        setUser(userLogged)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

    return (
      <AuthContext.Provider value={{ 
        user, 
        sigIn,
        isLoadingUserStorageData
      }}>
        {children}
      </AuthContext.Provider>
    )
}