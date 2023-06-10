import { createContext, useContext } from "react"
export type AuthContext = {
  authToken: string
  setAuthToken:(c: string) => void
}

export const MyGlobalContext = createContext<AuthContext>({
authToken: 'ccc', // set a default value
setAuthToken: () => {},
})

export const useGlobalContext = () => useContext(MyGlobalContext)
