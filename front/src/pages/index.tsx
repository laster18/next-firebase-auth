import { NextPage, ExNextPageContext } from 'next'
import Link from 'next/link'
import { Container, Grid, Image } from 'semantic-ui-react'
import Layout from '~/components/Layout'

const IndexPage: NextPage = () => {
  return (
    <Layout header>
      <Link href="/private">
        <a>to private page</a>
      </Link>
      <Container text>
        <Grid columns={3} doubling>
          <Grid.Row>
            <Grid.Column>
              <Image src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Layout>
  )
}

IndexPage.getInitialProps = async (ctx: ExNextPageContext) => {
  // 必要な情報をfetchする
  console.log('ctx: ', ctx)
}

export default IndexPage
