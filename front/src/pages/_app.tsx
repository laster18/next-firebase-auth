import React from 'react'
import App, { AppContext } from 'next/app'
import { useRouter } from 'next/router'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import ContextProvider from '~/context'
import theme from '~/theme'
import { PageTransition } from 'next-page-transitions'

import Loader from '~/components/Loader'

import 'semantic-ui-css/semantic.min.css'

const TIMEOUT = 400

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;

    font-size: 16px;
    letter-spacing: -0.003em;
    line-height: 1.58;
  }

  .page-transition-enter {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }

  .page-transition-enter-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
  }

  .page-transition-exit {
    opacity: 1;
  }

  .page-transition-exit-active {
    opacity: 0;
    transition: opacity ${TIMEOUT}ms;
  }

  .loading-indicator-appear,
  .loading-indicator-enter {
    opacity: 0;
  }

  .loading-indicator-appear-active,
  .loading-indicator-enter-active {
    opacity: 1;
    transition: opacity ${TIMEOUT}ms;
  }
`

const MyComponent: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const router = useRouter()
  // const session = useAuthentication()

  // console.log('router.route ', router.route)

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

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <MyComponent>
        <Component {...pageProps} />
      </MyComponent>
    )
  }
}
