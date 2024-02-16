import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import { userStorageGet, userStorageRemove, userStorageSave } from "@storage/storageUser";
import { ReactNode, createContext, useEffect, useState } from "react";

export type AuthContextDataProps = {
    user: UserDTO
    singIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
    isLoadingUserStorageData: boolean
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser(userData); 
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setIsLoadingUserStorageData(true)
      await userStorageSave(userData);
      await storageAuthTokenSave(token);
      setUser(userData);

    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }

  }

  async function singIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password})

      if(data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token);
        userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await userStorageRemove()
      await storageAuthTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);

      const userLogged = await userStorageGet();
      const token = await storageAuthTokenGet();
  
      if(userLogged){
        setUser(userLogged)

        if(token && userLogged) {
          userAndTokenUpdate(userLogged, token);
        } 
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
        singIn,
        signOut,
        isLoadingUserStorageData
      }}>
        {children}
      </AuthContext.Provider>
    )
}