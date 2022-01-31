import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const linkStyle = {
  display: 'flex',
  margin: 'auto',
  textDecoration: 'none',
  color: 'black',
  alignItems: 'flex-end',
};
const Navigation = ({ token }) => {
  const history = useHistory();
  const handleClick = async () => {
    localStorage.removeItem('token');
    history.push('/');
    window.location.reload(false);
  };
  return (
    <>
      <Navbar className='nav-bar' sticky='top'>
        <Navbar.Brand>Fitness Trac.kr</Navbar.Brand>
        <Nav className='me-auto'>
          <NavItem componentclass='span'>
            <Link to='/' style={linkStyle}>
              Home
            </Link>
          </NavItem>
          <NavItem componentclass='span'>
            <Link to='/routines' style={linkStyle}>
              Routines
            </Link>
          </NavItem>
          <NavItem componentclass='span'>
            <Link to='/activities' style={linkStyle}>
              Activities
            </Link>
          </NavItem>
          <br />
          {!token ? (
            <>
              <NavItem componentclass='span'>
                <Link to='/login' style={linkStyle}>
                  Login
                </Link>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem componentclass='span'>
                <Link to='/profile' style={linkStyle}>
                  Profile
                </Link>
              </NavItem>

              <br />
              <NavItem componentclass='span'>
                <Link to='/myroutines' style={linkStyle}>
                  My Routines
                </Link>
              </NavItem>
              <br />
              <NavItem componentclass='span'>
                <Link to='/routines/new' style={linkStyle}>
                  Add Routine
                </Link>
              </NavItem>
              <br />
              <NavItem componentclass='span'>
                <Link to='/' style={linkStyle} onClick={handleClick}>
                  Logout
                </Link>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default Navigation;
