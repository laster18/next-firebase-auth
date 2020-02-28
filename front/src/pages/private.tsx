import { useState } from 'react'
import { NextPage, ExNextPageContext } from 'next'
import Router from 'next/router'
import { parseCookies, setCookie } from 'nookies'
import Layout from '~/components/Layout'
import { doGetIdToken } from '~/services/firebase/auth'
import { getPrivateMessage } from '~/utils/api'
// import {} from '~/auth'

const PrivatePage: NextPage<{ message: string }> = ({ message }) => {
  // const session = useContext(SessionContext)
  // const [token, setToken] = useState('')

  // const handleGetToken = async () => {
  //   try {
  //     const idToken = await doGetIdToken()

  //     console.log('idToken: ', idToken)
  //     setToken(idToken)
  //   } catch (error) {
  //     console.log('error: ', error)
  //   }
  // }

  return (
    <Layout header>
      <h2>Private Page</h2>
      <p>message: {message}</p>
    </Layout>
  )
}

PrivatePage.getInitialProps = async (ctx: ExNextPageContext) => {
  console.log('PrivatePage.getInitialProps!')
  const {
    res,
    auth: { token },
  } = ctx

  // ログインしてなかった場合のリダイレクト処理
  const redirectOnError = () =>
    res
      ? res.writeHead(302, { Location: '/login' }).end()
      : Router.push('/login')

  try {
    if (!token) throw new Error('not exists token.')

    const res = await getPrivateMessage(token)

    const message = res.data.message
    return { message }
  } catch (error) {
    console.log('error: ', error)
    await redirectOnError()
    return { message: 'fetchでエラーが発生しました' }
  }
}

// const condition = (session: Session) => !!session.authUser

// export default withAuthorization(condition)(IndexPage)

export default PrivatePage
