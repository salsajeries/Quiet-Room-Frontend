import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import LiveBackground from '@/components/LiveBackground'
import MechButton from '@/components/MechButton'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import Layout from '@/components'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>      
    <Layout>
      <Container className={styles.container} fluid={'sm'}>
        <Row>
          <Col className={styles.mainCenter}>
            <img src={'logo-light.png'} className={styles.logoStyle} />
          </Col>
          <Col className={styles.mainCenter}>
            <Stack className={styles.mainCenter}>
              <MechButton href={'/roominfo'} text={'Find Room Info'} width={'30vw'} height={'auto'} />
              <MechButton href={'/availablerooms'} text={'Find Available Rooms'} width={'30vw'} height={'auto'} />
            </Stack>
          </Col>
        </Row>
      </Container>
    </Layout>
    </>
  )
}