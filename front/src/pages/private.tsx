import { NextPage, ExNextPageContext } from 'next'
import Router from 'next/router'
import Layout from '~/components/Layout'
import { getPrivateMessage } from '~/utils/api'
import { withAuthSync } from '~/auth'
import { AxiosError } from 'axios'

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

  // ログインしてなかった場合+initial処理してなかったときのリダイレクト処理
  const redirectOnError = (error: AxiosError) => {
    let redirectUrl = '/login'
    if (
      error.response?.status === 404 &&
      error.response.data.message === 'not initialized.'
    ) {
      redirectUrl = '/initial'
    }

    res
      ? res.writeHead(302, { Location: redirectUrl }).end()
      : Router.push(redirectUrl)
  }

  try {
    if (!token) throw new Error('not exists token.')

    const res = await getPrivateMessage(token)

    const message = res.data.message
    return { message }
  } catch (error) {
    console.log('error: ', error)
    await redirectOnError(error)
    return { message: 'fetchでエラーが発生しました' }
  }
}

export default withAuthSync(PrivatePage)
