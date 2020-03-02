import React from 'react'
import styled, { css } from 'styled-components'
import Head from 'next/head'
import { Container } from 'semantic-ui-react'
import Header from '~/components/Header'
import { PageTransition } from 'next-page-transitions'
import Loader from '~/components/Loader'
import { TIMEOUT } from '~/styles'

type Props = {
  title?: string
  header?: boolean
}

const Layout: React.FC<Props> = ({
  children,
  title = 'This is the default title',
  header = false,
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet prefetch"
        href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/components/icon.min.css"
      />
    </Head>
    {header && <Header />}
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
      <Container text>
        <Body header={header}>{children}</Body>
      </Container>
    </PageTransition>
  </div>
)

const Body = styled.div<{ header: boolean }>`
  padding: 20px 0;
  ${({ theme, header }) =>
    header
      ? css`
          min-height: calc(
            100vh - ${theme.size.headerHeight}px - ${theme.size.footerHeight}px
          );
        `
      : css`
          min-height: calc(100vh - ${theme.size.footerHeight}px);
        `}
`

export default Layout
