import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { doSignOut } from '~/services/firebase/auth'
import { doLogout } from '~/utils/api'

const HeaderComponent: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('jwt')
    doSignOut()
    doLogout()
  }

  return (
    <Continer>
      <Link href={`/signup`}>
        <a>Sign Up</a>
      </Link>
      <Link href={`/login`}>
        <a>Login</a>
      </Link>
      <button onClick={handleLogout}>Sign Out</button>
    </Continer>
  )
}

const Continer = styled.div`
  height: ${props => props.theme.size.headerHeight}px;
  display: flex;
  align-items: center;
`

export default HeaderComponent
