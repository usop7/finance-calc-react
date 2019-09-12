import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap'

class Header extends React.Component {

  /*
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: window.isLoggedIn,
      userName: window.userName
    }
    console.log('constructing: ' + this.state.isLoggedIn + ', ' + this.state.userName);
  }
  */
  handleLoginBtn()
  {
    if (!window.gAuth.isSignedIn.get())
    {
      window.gAuth.signIn().then(function(){
        console.log('gAuth.signIn');
        window.isLoggedIn = true;
        window.userName = window.gAuth.currentUser.get().getBasicProfile().getGivenName();
        document.getElementById("btnLogin").value = window.userName + "- Sign out";
      });
    }
    else
    {
      window.gAuth.signOut().then(function(){
        console.log('gAuth.signOut');
        window.isLoggedIn = false;
        window.userName = "";
        document.getElementById("btnLogin").value = "Sign in with Google";
      })
    }
  }

  render() {

    if(window.isLoggedIn && document.getElementById("btnLogin").value == "Sign in with Google")
      document.getElementById("btnLogin").value = window.userName + " - Sign out";

    return (
      <header>
        <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Finance Calculator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href='/mortgage'>Mortgage Calculator</Nav.Link>
                <Nav.Link href='/loan'>Loan Calculator</Nav.Link>
                <Nav.Link href='/savings'>Savings Calculator</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="button" id="btnLogin" value="Sign in with Google" onClick={this.handleLoginBtn} className="mr-sm-2" />
            </Form>
        </Navbar.Collapse>
        </Navbar>
  
  
      </header>
    )
  }
  

}

export default Header