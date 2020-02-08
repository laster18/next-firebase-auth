import { NextPage } from 'next'
import SignupForm from '~/components/SignupForm'
import Layout from '~/components/Layout'

const SignupPage: NextPage = () => {
  return (
    <Layout>
      <SignupForm />
    </Layout>
  )
}

export default SignupPage
