import React from 'react'
import Link from 'next/link'
import { Container, Dropdown, Menu } from 'semantic-ui-react'
import { doSignOut } from '~/services/firebase/auth'
import { logout } from '~/auth'

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
                <Link href={`/signup`}>
                  <Dropdown.Item as="a">Sign Up</Dropdown.Item>
                </Link>
                <Link href={`/login`}>
                  <Dropdown.Item as="a">Login</Dropdown.Item>
                </Link>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  )
}

export default HeaderComponent
