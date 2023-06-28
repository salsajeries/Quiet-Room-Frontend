import React, { useEffect, useState } from 'react';
import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Skeleton, Typography } from '@mui/material';

interface CardRoomInfoProps {
    cardTitle: string,
    cardRoomType: string,
    cardCapacity: string,
    loading: boolean;
}

export default function CardRoomInfo(props: CardRoomInfoProps) {
    
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
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Room Information Advanced
                    </Typography>
                    <Typography variant="h3" component="div" style={{ marginBottom: 6 }}>
                        {loading ? (
                            <Skeleton sx={{ height: 190 }} variant="rectangular" />
                        ) : (
                            <>{props.cardTitle}</>
                        )}
                    </Typography>
                    <Typography variant="h4" component="div" style={{ marginBottom: 6 }}>
                        {loading ? (
                            <Skeleton sx={{ heigh: 100 }} variant="rectangular" />
                        ) : (
                            <>{props.cardRoomType}</>
                        )}
                    </Typography>
                    <Typography variant="h4" component="div" style={{ marginBottom: 6 }}>
                        {loading ? (
                            <Skeleton sx={{ heigh: 100 }} variant="rectangular" />
                        ) : (
                            <>{props.cardCapacity}</>
                        )}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}
