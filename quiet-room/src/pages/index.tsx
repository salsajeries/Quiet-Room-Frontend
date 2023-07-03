import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import LiveBackground from '@/components/LiveBackground'
import MechButton from '@/components/MechButton'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import Layout from '@/components'
import { Grid } from '@mui/material'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>      
    <Layout>
    <LiveBackground></LiveBackground>
      <Container className={styles.container}>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          columns={{xs: 2, sm: 6, md: 6}}
        >
          <Grid item className={styles.mainCenter} xs={3}>
            <img src={'logo-light.png'} className={styles.logoStyle} />
          </Grid>
          <Grid item xs={3} minWidth={'400px'}>
            <Stack className={styles.mainCenter}>
              <MechButton href={'/roominfo'} text={'Find Room Info'} width={'30vw'} height={'auto'} fontSize={'2vw'} />
              <MechButton href={'/availablerooms'} text={'Find Available Rooms'} width={'30vw'} height={'auto'} fontSize={'2vw'} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Layout>
    </>
  )
}