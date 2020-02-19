import { useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import Layout from '~/components/Layout'
import { doGetIdToken } from '~/services/firebase/auth'

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

  // const isServer = !!ctx.req

  // try {
  //   const data = await fetchHello(isServer)

  //   console.log('data: ', data)
  // } catch (error) {
  //   console.log('error: ', error)
  // }

  return { content: 'これがメッセージ!!!update!!!!' }
}

// const condition = (session: Session) => !!session.authUser

// export default withAuthorization(condition)(IndexPage)

export default PrivatePage
