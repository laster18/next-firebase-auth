import React from 'react'
import { Session } from '~/models'

const SessionContext = React.createContext<Session>({
  authUser: null,
  isSessionChecked: false,
})

export default SessionContext
