import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav id="navbar">
      WELCOME!
      <Link to="/">Profile</Link>
      <Link to="/events">Events</Link>
      <Link to="/groups">Groups</Link>
    </nav>
  )
}

export default Navbar
