import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

export default class Header extends React.Component {

  render() {

    return (
      <header>
        <Navbar expand="lg" bg="light" variant="light">
        <Navbar.Brand href="/"><div className="appTitle"><b>Kim's Finance</b></div></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href='/mortgage'>Mortgage Calculator</Nav.Link>
                <Nav.Link href='/loan'>Loan Calculator</Nav.Link>
                <Nav.Link href='/savings'>Savings Calculator</Nav.Link>
                <Nav.Link href='/savings'>RRSP Calculator</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
  

}
