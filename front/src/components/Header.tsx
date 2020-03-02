import React from 'react'
import Link from 'next/link'
import { Container, Dropdown, Menu } from 'semantic-ui-react'
import styled from 'styled-components'
import { doSignOut } from '~/services/firebase/auth'
import { logout } from '~/utils/auth'

const HeaderComponent: React.FC = () => {
  const handleLogout = () => {
    doSignOut().then(() => logout())
  }

  return (
    <div>
      <Menu inverted>
        <Container>
          <Menu.Item header>Sample App</Menu.Item>
          <Link href="/">
            <Menu.Item as="a">Home</Menu.Item>
          </Link>
          <Link href="/private">
            <Menu.Item as="a">Private Page</Menu.Item>
          </Link>

          <Menu.Item position="right">
            <Dropdown item simple text="Account">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link href={`/signup`}>
                    <StyledLink>Sign Up</StyledLink>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href={`/login`}>
                    <StyledLink>Login</StyledLink>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  )
}

const StyledLink = styled.a`
  color: rgba(0, 0, 0, 0.87) !important;
`

export default HeaderComponent
