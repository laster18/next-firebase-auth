import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { doSignOut } from '~/services/firebase/auth'

const HeaderComponent: React.FC = () => (
  <Continer>
    <Link href={`/signup`}>
      <a>Sign Up</a>
    </Link>
    <Link href={`/login`}>
      <a>Login</a>
    </Link>
    <button onClick={doSignOut}>Sign Out</button>
  </Continer>
)

const Continer = styled.div`
  height: ${props => props.theme.size.headerHeight}px;
  display: flex;
  align-items: center;
`

export default HeaderComponent
