import styles from '../styles/NavbarObj.module.css'
import Link from 'next/link';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import React from 'react';


export default function NavbarObj() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleShow}
              sx={{ mr: 2 }}
            >
              <img
                src="bars-solid.svg"
                height="40vh"
                className="d-inline-block align-top"
                alt="UAH QuietRoom"
                />
            </IconButton>
            <Link href='/'>
              <Box
                sx={{
                  minWidth: '330px',
                  display: { md: 'flex' },
                }}
              >
                <img
                  src="icon-light.png"
                  height="45vh"
                  className="d-inline-block align-top"
                  alt="UAH QuietRoom"
                />
                <img
                  src="logo-text-light.png"
                  height="45vh"
                  className="d-inline-block align-top"
                  alt="UAH QuietRoom"
                  style={{padding: '10px'}}
                />
              </Box>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      <Offcanvas show={show} onHide={handleClose} style={{ backgroundColor: '#181848', color: '#E0DDDD', width: '320px' }}>
        <Offcanvas.Header closeButton closeVariant='white'>
          <Offcanvas.Title>
            <Link href='/'>
              <img
                src="logo-dark.png"
                height="50vh"
                className="d-inline-block align-top"
                alt="UAH QuietRoom"
              />
            </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link href='/roominfo' style={{textDecoration: 'none'}}>
            <p style={{color: '#e0DDDD'}} className={styles.pageButton}>
              Find Room Info
            </p>
          </Link>
          <Link href='/availablerooms' style={{textDecoration: 'none'}}>
            <p style={{color: '#e0DDDD'}} className={styles.pageButton}>
              Available Rooms
            </p>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}