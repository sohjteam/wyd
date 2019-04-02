import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

const barStyle = {
  backgroundColor: '#b7d1e1'
}

const linkStyle = {
  color: 'white'
}

const NavigationBar = () => {
  return (
    <div>
      <Navbar style={barStyle} light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink style={linkStyle} href="/components/">
              Components
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">
              GitHub
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  )
}

export default NavigationBar
