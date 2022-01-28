import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
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
      <Navbar bg='secondary' variant='secondary' sticky='top'>
        <Navbar.Brand>Fitness Trac.kr</Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link to='/'>
            <Link to='/' style={linkStyle}>
              Home
            </Link>
          </Nav.Link>
          <br />
          {!token ? (
            <Nav.Link>
              <Link to='/login' style={linkStyle}>
                Login
              </Link>
            </Nav.Link>
          ) : (
            <>
              <Nav.Link>
                <Link to='/profile' style={linkStyle}>
                  Profile
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to='/routines' style={linkStyle}>
                  Routines
                </Link>
              </Nav.Link>

              <br />

              <Nav.Link>
                <Link to='/' style={linkStyle} onClick={handleClick}>
                  Logout
                </Link>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default Navigation;
