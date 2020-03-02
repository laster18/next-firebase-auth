import { NextPage, ExNextPageContext } from 'next'
import Layout from '~/components/Layout'

const IndexPage: NextPage = () => {
  return <Layout header>これはトップページです</Layout>
}

IndexPage.getInitialProps = async (ctx: ExNextPageContext) => {
  // 必要な情報をfetchする
  console.log('ctx: ', ctx)
}

export default IndexPage
