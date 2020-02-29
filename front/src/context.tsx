import React, { useEffect, createContext, useState } from 'react'
import SessionContext from '~/context/session'
import { auth } from '~/services/firebase'
import { Session } from '~/models'

interface SampleContextValue {
  value: {
    name: string
  }
  setSampleState: (state: { name: string }) => void
}

export const SampleContext = createContext<SampleContextValue>({
  value: { name: '' },
  setSampleState: () => {},
})
export const SampleProvider = SampleContext.Provider
export const SessionContextProvider = SessionContext.Provider

const useAuthentication = () => {
  const [session, setSession] = useState<Session>({
    authUser: null,
    isSessionChecked: false,
  })

  useEffect(() => {
    const onAuthStateListener = auth.onAuthStateChanged(authUser => {
      authUser
        ? setSession({ authUser, isSessionChecked: true })
        : setSession({ authUser: null, isSessionChecked: true })
    })

    return () => onAuthStateListener()
  }, [])

  return session
}

const Provider: React.FC = ({ children }) => {
  const [sampleState, setSampleState] = useState({ name: 'hogeeeee' })
  const session = useAuthentication()

  return (
    <SampleProvider value={{ value: sampleState, setSampleState }}>
      <SessionContextProvider value={session}>
        {children}
      </SessionContextProvider>
    </SampleProvider>
  )
}

export default Provider
