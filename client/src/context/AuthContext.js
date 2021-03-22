import { createContext } from 'react'

function n () {}

export const AuthContext  = createContext({
  token: null,
  refreshToken: null,
  userId: null,
  login: n,
  logout: n,
  isAuthenticated: false,
  photoPath: ""
})