import { NextPage, ExNextPageContext } from 'next'
import Router from 'next/router'
import Layout from '~/components/Layout'
import { getPrivateMessage } from '~/utils/api'
import { withAuthSync } from '~/auth'

interface PrivatePageProps {
  message: string
}

const PrivatePage: NextPage<PrivatePageProps> = ({ message }) => {
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

export default withAuthSync(PrivatePage)
