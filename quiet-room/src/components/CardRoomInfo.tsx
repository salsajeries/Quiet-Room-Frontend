import React, { useEffect, useState } from 'react';
import { Avatar, Card, CardContent, CardHeader, Divider, Skeleton, Typography } from '@mui/material';

interface CardRoomInfoProps {
    cardTitle: string,
    cardRoomType: string,
    cardCapacity: string,
    cardIcon: string,
    loading: boolean;
}

export default function CardRoomInfo(props: CardRoomInfoProps) {
    
    // Loading state for card
    const { loading = false } = props;

    return (
        <>
            <Card variant="outlined"
                sx={{
                    border: 'solid 2px',
                    borderColor: '#181848',
                    borderRadius: '15px',
                    backgroundColor: 'transparent',
                    spacing: '5px'
                }}
            >
                <CardHeader
                    avatar={
                    loading ? (
                        <Skeleton variant="circular" width={'50px'} height={'50px'} />
                    ) : (
                        <Avatar sx={{ width: '50px', height: '50px', bgcolor: 'transparent' }}>
                            <img 
                                src={props.cardIcon}
                                height='30px'
                            />
                        </Avatar>
                    )
                    }
                    title={
                        <Typography variant='subtitle1'>Room Quick View</Typography>
                    }
                />
                <Divider role='presentation' sx={{ bgcolor: '#181848' }} />
                <CardContent>
                    <Typography variant="h3" component="div" style={{ marginBottom: 6 }}>
                        {loading ? (
                            <Skeleton variant="rounded" />
                        ) : (
                            <>{props.cardTitle}</>
                        )}
                    </Typography>
                    <Typography variant="h5" component="div" style={{ marginBottom: 6 }}>
                        {loading ? (
                            <Skeleton variant="rounded" />
                        ) : (
                            <>Room Type: {props.cardRoomType}</>
                        )}
                    </Typography>
                    <Typography variant="h5" component="div" style={{ marginBottom: 6 }}>
                        {loading ? (
                            <Skeleton variant="rounded" />
                        ) : (
                            <>Capacity: {props.cardCapacity}</>
                        )}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}