import React from 'react'
import { NextPageContext } from 'next'
import { parseCookies } from 'nookies'

export interface Auth {
  token?: string
}

export function loadAuthFromCookie(ctx: NextPageContext): Auth {
  const { token } = parseCookies(ctx)
  return { token }
}

export const AuthContext = React.createContext<Auth>({})

export function useAuth() {
  const auth = React.useContext(AuthContext)
  return {
    auth,
    login: () => {}, // ログイン処理
    logout: () => {}, // ログアウト処理
  }
}
