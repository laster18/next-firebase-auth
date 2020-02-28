import { NextPage, ExNextPageContext } from 'next'
import Link from 'next/link'
import { Container, Grid, Image, Divider } from 'semantic-ui-react'
import Layout from '~/components/Layout'

const text = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque
penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link
mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante,
dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla
ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.`

const IndexPage: NextPage = () => {
  return (
    <Layout header>
      <Link href="/private">
        <a>private</a>
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
        <Divider horizontal>または</Divider>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={10}>
              <p>{text}</p>
            </Grid.Column>
            <Grid.Column width={6}>
              <p>{text}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Layout>
  )
}

IndexPage.getInitialProps = async (ctx: ExNextPageContext) => {
  console.log('hogeeeeeeeeeeeeeeeeeeeee!!!!!!!!!!!!!!!!!: ', ctx.auth)
}

// const condition = (session: Session) => !!session.authUser

// export default withAuthorization(condition)(IndexPage)

export default IndexPage
