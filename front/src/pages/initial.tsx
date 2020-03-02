import { useState, useCallback, useContext } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Button, Form } from 'semantic-ui-react'
import Layout from '~/components/Layout'
import useForm from '~/hooks/use-form'
import { AuthContext } from '~/auth'
import { postProfile } from '~/utils/api'

const Initial: NextPage = () => {
  const { formData, onChangeText } = useForm({ displayName: '' })
  const { token } = useContext(AuthContext)
  const [poting, setPosting] = useState(false)
  const router = useRouter()

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setPosting(true)
      console.log({ formData })
      try {
        const res = await postProfile(token as string, formData)
        console.log('res: ', res)
        router.push('/private')
      } catch (err) {
        console.log('err: ', err)
      }
      setPosting(false)
    },
    [formData],
  )

  return (
    <Layout header>
      <h2>名前を設定してください</h2>
      <Form onSubmit={handleSubmit} loading={poting}>
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="First Name"
            name="displayName"
            onChange={onChangeText}
            value={formData.displayName}
          />
        </Form.Field>
        <Button
          type="submit"
          color="black"
          disabled={formData.displayName === ''}
        >
          Submit
        </Button>
      </Form>
    </Layout>
  )
}

export default Initial
