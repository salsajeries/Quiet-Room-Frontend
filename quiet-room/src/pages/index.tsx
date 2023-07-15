import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import LiveBackground from '@/components/LiveBackground'
import MechButton from '@/components/MechButton'
import { Avatar, Container, Stack, Typography } from '@mui/material'
import Layout from '@/components'
import { Grid } from '@mui/material'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>      
    <Layout>
      <Container className={styles.container}>
        <Grid container
          direction={"row"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          columns={{xs: 2, sm: 6, md: 8}}
          spacing={3}
        >
          <Grid item className={styles.logoCenter} xs={4}>
            <img src={'logo-light.png'} className={styles.logoStyle} alt={'Logo-Light'} style={{minWidth: '340px'}} />
          </Grid>
          <Grid item xs={4}>
            <Grid container direction={'column'} columns={{xs: 3}}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                minWidth: '340px'
            }}>
              <Grid item xs={3}>
                <MechButton href={'/roominfo'} text={'Find Room Info'} width={'30vw'} height={'auto'} fontSize={'3.5vh'} />
              </Grid>
              <Grid item xs={3}>
                <MechButton href={'/availablerooms'} text={'Find Available Rooms'} width={'30vw'} height={'auto'} fontSize={'3.5vh'} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container className={styles.aboutContainer}>
        <Typography variant='h2' style={{color: 'black'}}>About</Typography>
      </Container>
    </Layout>
    </>
  )
}