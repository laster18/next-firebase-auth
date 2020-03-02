import React from 'react'
import { NextPageContext } from 'next'
import Head from 'next/head'
import App from 'next/app'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { ThemeProvider } from 'styled-components'
import { loadAuthFromCookie, AuthContext, Auth } from '~/auth'
import theme from '~/theme'
import { PageTransition } from 'next-page-transitions'
import Loader from '~/components/Loader'
import { GlobalStyle, TIMEOUT } from '~/styles'
import 'semantic-ui-css/semantic.min.css'

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const MyComponent: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const router = useRouter()

  return (
    <>
      <Head>
        {/* Import CSS for nprogress */}
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </>
  )
}

export default class MyApp extends App<{ auth: Auth }> {
  static async getInitialProps({
    Component,
    ctx,
  }: {
    Component: any // 一旦any
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
