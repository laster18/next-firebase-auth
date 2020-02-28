import { useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import { parseCookies, setCookie } from 'nookies'
import Layout from '~/components/Layout'
import { doGetIdToken } from '~/services/firebase/auth'
// import {} from '~/auth'

const PrivatePage: NextPage<{ content: string }> = ({ content }) => {
  // const session = useContext(SessionContext)
  const [token, setToken] = useState('')

  const handleGetToken = async () => {
    try {
      const idToken = await doGetIdToken()

      console.log('idToken: ', idToken)
      setToken(idToken)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <Layout header>
      <h2>Private Page</h2>
      <div>
        <h3>Content:</h3>
        <p>{content}</p>
      </div>
      <div>
        <button onClick={handleGetToken}>getToken</button>
        <h3>Token:</h3>
        <p>{token}</p>
      </div>
    </Layout>
  )
}

PrivatePage.getInitialProps = async ctx => {
  console.log('PrivatePage.getInitialProps!')

  setCookie(ctx, 'token', 'koreha_token_desu', {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
  // console.log('ctx.res: ', ctx.res)
  console.log('ctx.req: ', ctx.req?.headers.cookie)
  const cookie = parseCookies(ctx)
  console.log({ cookie })

  // const hoge = cookie.token

  // const isServer = !!ctx.req

  // try {
  //   const data = await fetchHello(isServer)

  //   console.log('data: ', data)
  // } catch (error) {
  //   console.log('error: ', error)
  // }

  const { res, req } = ctx

  // ログインしてなかった場合のリダイレクト処理
  if (res) {
    res.writeHead(302, { Location: '/' })
    res.end()
  }

  return { content: 'これがメッセージ!!!update!!!!' }
}

// const condition = (session: Session) => !!session.authUser

// export default withAuthorization(condition)(IndexPage)

export default PrivatePage
