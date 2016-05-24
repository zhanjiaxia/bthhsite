import React from 'react'
import { IndexLink } from 'react-router'
import { Header as HeaderContainer } from './container'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import SearchBar from '../../search/searchbar'

class Header extends React.Component {
  render() {
    return (
      <HeaderContainer>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/">Ken's</IndexLink>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#" active>BTHH</NavItem>
            <NavItem eventKey={2} href="#">潮州人文</NavItem>
            <NavDropdown eventKey={3} title="技术博客" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>React</MenuItem>
              <MenuItem eventKey={3.2}>NodeJS</MenuItem>
              <MenuItem eventKey={3.3}>Python</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>开发中...</MenuItem>
            </NavDropdown>
          </Nav>
          <SearchBar className="navbar-form navbar-right" />
        </Navbar>
      </HeaderContainer>
    )
  }
}

export default Header