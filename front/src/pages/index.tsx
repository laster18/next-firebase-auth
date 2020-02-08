import { useContext } from 'react'
import { NextPage } from 'next'
import { Container, Grid, Image, Divider } from 'semantic-ui-react'
import { fetchHello } from '~/utils/api'
import SessionContext from '~/context/session'
import { Session } from '~/models'
import withAuthorization from '~/components/Session/withAuthorization'
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
  const session = useContext(SessionContext)

  console.log('contextから取り出したsession: ', session)

  return (
    <Layout header>
      <Container text>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
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
          ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
        </p>
      </Container>
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

IndexPage.getInitialProps = async ctx => {
  const isServer = !!ctx.req

  try {
    const data = await fetchHello(isServer)

    console.log('data: ', data)
  } catch (error) {
    console.log('error: ', error)
  }
}

const condition = (session: Session) => !!session.authUser

export default withAuthorization(condition)(IndexPage)
