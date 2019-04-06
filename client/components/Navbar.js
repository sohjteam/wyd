import React, {Component} from 'react'
import {connect} from 'react-redux'
import {logOut} from '../store/user'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
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
    this.state = {
      isOpen: false
    }

    this.toggle = this.toggle.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleLogout() {
    this.props.logout()
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
                {this.props.userId ? (
                  <NavLink
                    style={linkStyle}
                    onClick={this.handleLogout}
                    href="/login"
                  >
                    Logout
                  </NavLink>
                ) : (
                  <NavLink style={linkStyle} href="/login">
                    Login
                  </NavLink>
                )}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
