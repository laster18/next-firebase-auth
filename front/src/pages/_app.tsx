import React from 'react'
import { NextPageContext } from 'next'
import App, { AppContext } from 'next/app'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'styled-components'
import { loadAuthFromCookie, AuthContext, Auth } from '~/auth'
import ContextProvider from '~/context'
import theme from '~/theme'
import { PageTransition } from 'next-page-transitions'
import Loader from '~/components/Loader'
import { GlobalStyle, TIMEOUT } from '~/styles'
import 'semantic-ui-css/semantic.min.css'

const MyComponent: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const router = useRouter()
  // const session = useAuthentication()

  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <GlobalStyle />
        {/* <Head /> */}
        <PageTransition
          timeout={TIMEOUT}
          classNames="page-transition"
          loadingClassNames="loading-indicator"
          loadingComponent={<Loader />}
          loadingDelay={500}
          loadingTimeout={{
            enter: TIMEOUT,
            exit: 0,
          }}
        >
          {React.cloneElement(children, {
            key: router.route,
          })}
        </PageTransition>
      </ContextProvider>
    </ThemeProvider>
  )
}

export default class MyApp extends App<{ auth: Auth }> {
  // static async getInitialProps({ Component, ctx }: AppContext) {
  // getInitialPropsでauthを渡したいのでComponentの型をanyにしている
  // うまく型拡張ができるようにしたい
  static async getInitialProps({
    Component,
    ctx,
  }: {
    Component: any
    ctx: NextPageContext
  }) {
    let pageProps = {}

    const auth = loadAuthFromCookie(ctx)

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ...ctx, auth })
    }

    return { pageProps, auth }
  }

  render() {
    const { Component, pageProps, auth } = this.props

    return (
      <MyComponent>
        <AuthContext.Provider value={auth}>
          <Component {...pageProps} />
        </AuthContext.Provider>
      </MyComponent>
    )
  }
}
