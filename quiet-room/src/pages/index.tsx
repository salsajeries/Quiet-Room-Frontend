import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import LiveBackground from '@/components/LiveBackground'
import MechButton from '@/components/MechButton'
import { Col, Container, Row, Stack } from 'react-bootstrap'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <LiveBackground></LiveBackground>
      
      
      <Container className={styles.container}>
        <Row className={styles.mainRow}>
          <Col style={{backgroundColor: 'blue'}}>
            <img src={'logo-light.png'} className={styles.logoStyle} />
          </Col>
          <Col style={{backgroundColor: 'purple', alignItems: 'stretch'}}>
            <Stack>
              <MechButton href={'/roominfo'} text={'Find Room Info'} width={'30vw'} height={'auto'} />
              <MechButton href={'/availablerooms'} text={'Find Available Rooms'} width={'30vw'} height={'auto'} />
            </Stack>
          </Col>
        </Row>
      </Container>

    </>
  )
}

/**
 *       <MechButton href={'/roominfo'} text={'FIND ROOM INFO'} />
 * 
 * <table style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <tr style={{}}>
          <td style={{}}>
            
          </td>
          <td>
            
          </td>
        </tr>
      </table>
 */