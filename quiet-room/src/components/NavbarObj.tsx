import styles from '../styles/NavbarObj.module.css'
import Link from 'next/link'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useState } from 'react'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import React from 'react'

export default function NavbarObj() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
          <Toolbar sx={{margin: '1%'}}>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleShow}
              sx={{ mr: 2, display: { sm: 'flex', md: 'none' } }}
            >
              <img src="bars-solid.svg" height="40vh" className="d-inline-block align-top" alt="UAH QuietRoom" />
            </IconButton>
            <Box
              sx={{
                display: { md: 'flex' },
                paddingRight: '20px',
              }}
            >
              <Link href="/">
                <img src="logo-light.png" height="75vh" className="d-inline-block align-top" alt="UAH QuietRoom" />
              </Link>
            </Box>
            <Box sx={{
                display: { xs: 'none', sm: 'none', md: 'flex' },
                width: 'auto',
                color: '#181848',
                paddingLeft: '20px',
                paddingRight: '20px'
              }}
            >
              <Link href="/availablerooms" style={{ textDecoration: 'none', color: '#181848' }}>
                Available Rooms
              </Link>
            </Box>
            <Box sx={{
                display: { xs: 'none', sm: 'none', md: 'flex' },
                witdth: 'auto',
                color: '#181848',
                paddingLeft: '20px',
                paddingRight: '20px'
              }}
            >
              <Link href="/roominfo" style={{ textDecoration: 'none', color: '#181848' }}>
                Room Info
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Offcanvas
        show={show}
        onHide={handleClose}
        style={{ backgroundColor: '#181848', color: '#E0DDDD', width: '320px' }}
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>
            <Link href="/">
              <img src="logo-dark.png" height="50vh" className="d-inline-block align-top" alt="UAH QuietRoom" />
            </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link href="/roominfo" style={{ textDecoration: 'none' }}>
            <p style={{ color: '#e0DDDD' }} className={styles.pageButton}>
              Find Room Info
            </p>
          </Link>
          <Link href="/availablerooms" style={{ textDecoration: 'none' }}>
            <p style={{ color: '#e0DDDD' }} className={styles.pageButton}>
              Available Rooms
            </p>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
