import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { doSignOut } from '~/services/firebase/auth'
import { logout } from '~/utils/auth'

const HeaderComponent: React.FC = () => {
  const handleLogout = () => {
    doSignOut().then(() => logout())
  }

  return (
    <Continer>
      <Link href={`/signup`}>
        <a>Sign Up</a>
      </Link>
      <Link href={`/login`}>
        <a>Login</a>
      </Link>
      <Link href={`/login`}>
        <a>TopPage</a>
      </Link>
      <button type="button" onClick={handleLogout}>
        Sign Out
      </button>
    </Continer>
  )
}

const Continer = styled.div`
  height: ${props => props.theme.size.headerHeight}px;
  display: flex;
  align-items: center;
`

export default HeaderComponent
