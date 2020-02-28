// import { useEffect } from 'react'
import Router from 'next/router'
// import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

const AFTER_LOGIN_URL = '/'

export const login = ({ token }: { token: string }) => {
  cookie.set('token', token, { expires: 1 })
  Router.push(AFTER_LOGIN_URL)
}

export const logout = () => {
  cookie.remove('token')
  // to support logging out from all windows
  window.localStorage.setItem('logout', String(Date.now()))
  Router.push('/login')
}
