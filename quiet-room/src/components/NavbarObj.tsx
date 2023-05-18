import Link from 'next/link';
import styles from '../styles/NavbarObj.module.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavbarObj() {
  
  const expand = "false";
  
  return (
    <>
        <Navbar key={expand} bg="" expand={expand} className={styles.colorNav} fixed={"top"} variant={"dark"}>
          <Container fluid>
            <Navbar.Brand href="#home">
              <img
                src="logo-dark.png"
                height="100vh"
                className="d-inline-block align-top"
                alt="UAH QuietRoom"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
              <img className={styles.menuButton}
                src="bars-solid.png"
              />
            </Navbar.Toggle>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className={styles.colorOffcanvas}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} style={{fontSize: "250%"}}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link href="/" className={styles.linkStyle}>
                    <img src="home.png" className={styles.iconStyle} />
                    Home
                  </Link>
                  <Link href="availablerooms" className={styles.linkStyle}>
                    <img src="check.png" className={styles.iconStyle} />
                    Available Rooms
                  </Link>
                  <Link href="roominfo" className={styles.linkStyle}>
                    <img src="info.png" className={styles.iconStyle} />
                    Room Info
                  </Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}

export default NavbarObj;

  /**
   * <Col><img src="logo-light.png" width={"100%"} /></Col>
   */