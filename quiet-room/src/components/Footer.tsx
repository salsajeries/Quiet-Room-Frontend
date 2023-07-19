import { Typography } from '@mui/material'
import React from 'react'

export default function Footer() {

    return (
        <div style={{ 
            width: '100vw',
            height: '12vh',
            backgroundColor: '#CFC9C9',
            padding: '2vw',
            marginTop: '5vh'
        }}>
            <Typography variant='body1'>UAH QuietRoom</Typography>
            <Typography variant='body1'>Copyright © 2023</Typography>
        </div>
    )
}