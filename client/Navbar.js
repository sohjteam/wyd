import React, {Component} from 'react'
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
  backgroundColor: '#b7d1e1',
  fontFamily: ''
}

const linkStyle = {
  color: 'white'
}

class NavigationBar extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (
      <div>
        <Navbar style={barStyle} light expand="md">
          <NavbarBrand href="/">
            <img src="wydWeb.png" width="100" height="40" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink style={linkStyle} href="/profile">
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={linkStyle} href="/events">
                  Events
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={linkStyle} href="/groups">
                  Groups
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={linkStyle} href="/login">
                  Login
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default NavigationBar
