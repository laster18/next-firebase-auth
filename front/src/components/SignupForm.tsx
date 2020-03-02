import React, { useState } from 'react'
import Link from 'next/link'
import { Button, Form, Message, Segment, Grid, Header } from 'semantic-ui-react'
import { doCreateUserWithEmailAndPassword } from '~/services/firebase/auth'
import { login } from '~/auth'

const useFormState = <T extends object>(initialState: T) => {
  const [formData, setFormData] = useState(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return { formData, handleChange }
}

const SignupForm: React.FC = () => {
  const { formData, handleChange } = useFormState({
    email: '',
    password: '',
  })

  const handleSignup = async () => {
    if (!!formData.email && !!formData.password) {
      try {
        const res = await doCreateUserWithEmailAndPassword(
          formData.email,
          formData.password,
        )

        if (res.user) {
          res.user
            .getIdToken()
            .then(token => {
              login({ token })
            })
            .catch(error => {
              console.log(error)
            })
        }
      } catch (error) {
        console.log('error: ', error.message)
      }
    }
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Sign Up
        </Header>
        <Form size="large" onSubmit={handleSignup}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={handleChange}
              name="email"
              value={formData.email}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              name="password"
              value={formData.password}
            />

            <Button color="teal" fluid size="large">
              Signup
            </Button>
          </Segment>
        </Form>
        <Message>
          Do you have an account?{' '}
          <Link href="/login">
            <a>Log In</a>
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default SignupForm
