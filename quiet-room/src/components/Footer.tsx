import { Typography } from '@mui/material'
import React from 'react'

export default function Footer() {

    return (
        <div style={{ 
            width: '100vw',
            height: '12vh',
            backgroundColor: '#CFC9C9',
            marginTop: '5vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center'
        }}>
            <ul style={{ listStyleType: 'none', margin: '0', padding: '0', height: 'auto' }}>
                <li><Typography variant='body1' width={'100%'} flexBasis={'100%'}>UAH QuietRoom</Typography></li>
                <li><Typography variant='body1' width={'100%'}>Copyright © 2023</Typography></li>
            </ul>
        </div>
    )
}