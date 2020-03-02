import React, { useState } from 'react'
import Link from 'next/link'
import {
  Button,
  Form,
  Message,
  Segment,
  Grid,
  Header,
  Input,
} from 'semantic-ui-react'
import { doSignInWithEmailAndPassword } from '~/services/firebase/auth'
import { login } from '~/utils/auth'

const useFormState = <T extends object>(initialState: T) => {
  const [formData, setFormData] = useState(initialState)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return { formData, onChange }
}

const SignupForm: React.FC = () => {
  const { formData, onChange } = useFormState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.email && formData.password) {
      try {
        const res = await doSignInWithEmailAndPassword(
          formData.email,
          formData.password,
        )

        console.log('res: ', res)

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
        console.log('error: ', error)
      }
    }
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log In
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input>
              <Input
                fluid
                name="email"
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                autoComplete="username"
                onChange={onChange}
                value={formData.email}
              />
            </Form.Input>
            <Form.Input>
              <Input
                name="password"
                placeholder="Password"
                type="password"
                autoComplete="current-password"
                fluid
                icon="lock"
                iconPosition="left"
                onChange={onChange}
                value={formData.password}
              />
            </Form.Input>

            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          {`You don't have an account?`}{' '}
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default SignupForm
