import React, { useEffect } from 'react'
import { ExNextPageContext, NextComponentType } from 'next'
import Router from 'next/router'
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

export function withAuthSync<IP = {}, P = IP>(
  WrappedComponent: NextComponentType<ExNextPageContext, IP, P>,
) {
  const Wrapper = (props: P) => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }

    useEffect(() => {
      window.addEventListener('storage', syncLogout)

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async (ctx: ExNextPageContext) => {
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps }
  }

  return Wrapper
}
