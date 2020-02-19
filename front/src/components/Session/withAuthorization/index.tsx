import React from 'react'
import { useRouter } from 'next/router'
import SessionContext from '~/context/session'
import { Session } from '~/models'

type Condition = (session: Session) => boolean

const withAuthorization = (condition: Condition) => (
  Component: React.ComponentType,
) => (props: any) => {
  const router = useRouter()
  const session = React.useContext(SessionContext)

  // console.log('withAuthorization内 session: ', session)

  React.useEffect(() => {
    if (!session.isSessionChecked) {
      return
    }

    if (!condition(session)) {
      router.push('/login')
    }
  }, [session])

  return condition(session) ? <Component {...props} /> : null
}

export default withAuthorization
