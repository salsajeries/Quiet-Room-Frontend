import { Chip, Divider, IconButton, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export default function Footer() {

    const handleGithub = (e: any) => {
        console.log('Handle Github click')
    }

    return (
        <div id='bottom' style={{ 
            width: '100vw',
            height: '12vh',
            backgroundColor: '#CFC9C9',
            marginTop: '5vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            position: 'relative',
            bottom: '0',
            scrollBehavior: 'smooth'
        }}>
            <ul style={{ listStyleType: 'none', margin: '0', padding: '0', height: 'auto' }}>
                <li><Typography variant='body1' width={'100%'} flexBasis={'100%'}>UAH QuietRoom</Typography></li>
                <li><Typography variant='body1' width={'100%'}>Copyright © 2023</Typography></li>
            </ul>
            <Divider variant='middle'></Divider>
            <ul style={{ listStyleType: 'none', margin: '0', padding: '0', height: 'auto' }}>
                <li>
                    <Link href="https://forms.gle/PamUMtey2cBjPAnD6" style={{ textDecoration: 'none' }}>
                        <Chip variant='outlined' label='Feedback' onClick={handleGithub}
                            avatar={<img src="comment-regular.svg" height="30px" alt="Feedback" />}
                        />
                    </Link>
                </li>
                <li>
                    <Link href="https://github.com/QuietRoomUAH/Quiet-Room-Frontend" style={{ textDecoration: 'none' }}>
                        <Chip variant='outlined' label='Github' onClick={handleGithub}
                            avatar={<img src="github-icon.svg" height="30px" alt="Github" />}
                        />
                    </Link>
                </li>
            </ul>
            
        </div>
    )
}