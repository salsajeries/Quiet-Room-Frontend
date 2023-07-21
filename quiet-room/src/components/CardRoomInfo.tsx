import React from 'react'
import { Avatar, Card, CardContent, CardHeader, Divider, Skeleton, Typography } from '@mui/material'

interface CardRoomInfoProps {
  cardTitle: string
  cardRoomType: string
  cardCapacity: string
  cardIcon: string
  state: string         // States: empty, loading, set
}

export default function CardRoomInfo(props: CardRoomInfoProps) {
  // Loading state for card
  const { state = 'false' } = props

  if (state != 'empty') {
    return (
      <Card
        variant="outlined"
        sx={{
          color: '#181848',
          border: 'solid 2px',
          borderColor: '#181848',
          borderRadius: '15px',
          backgroundColor: '#E0DDDD',
          spacing: '5px',
        }}
      >
        <CardHeader
          avatar={
            state == 'loading' ? (
              <Skeleton variant="circular" width={'50px'} height={'50px'} />
            ) : (
              <Avatar sx={{ width: '50px', height: '50px', bgcolor: 'transparent' }}>
                <img src={props.cardIcon} height="30px" alt="" />
              </Avatar>
            )
          }
          title={<Typography variant="subtitle1">Room Quick View</Typography>}
        />
        <Divider role="presentation" sx={{ bgcolor: '#181848' }} />
        <CardContent>
          <Typography variant="h3" component="div" style={{ marginBottom: 6 }}>
            {state == 'loading' ? <Skeleton variant="rounded" /> : <>{props.cardTitle}</>}
          </Typography>
          <Typography variant="h5" component="div" style={{ marginBottom: 6 }}>
            {state == 'loading' ? <Skeleton variant="rounded" /> : <>Room Type: {props.cardRoomType}</>}
          </Typography>
          <Typography variant="h5" component="div" style={{ marginBottom: 6 }}>
            {state == 'loading' ? <Skeleton variant="rounded" /> : <>Capacity: {props.cardCapacity}</>}
          </Typography>
        </CardContent>
      </Card>
    )
  }
  else {
    return (
      <Card
        variant="outlined"
        sx={{
          color: '#181848',
          border: 'solid 2px',
          borderColor: '#181848',
          borderRadius: '15px',
          backgroundColor: '#E0DDDD',
          spacing: '5px',
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ width: '50px', height: '50px', bgcolor: 'transparent' }}>
              <img src={'info.png'} height="30px" alt="" />
            </Avatar>
          }
          title={<Typography variant="subtitle1">Room Quick View</Typography>}
        />
        <Divider role="presentation" sx={{ bgcolor: '#181848' }} />
        <CardContent>
          <Typography variant="subtitle1" component="div" style={{ marginBottom: 6 }}>
            <i>Room details will appear here!</i>
          </Typography>
        </CardContent>
      </Card>
    )
  }

}
