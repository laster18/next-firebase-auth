import { NextPageContext } from 'next'
import { setCookie } from 'nookies'

export const setTokenToCookie = (ctx: NextPageContext, token: string) => {
  setCookie(ctx, 'token', token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
}
