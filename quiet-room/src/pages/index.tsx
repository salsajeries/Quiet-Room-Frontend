import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import LiveBackground from '@/components/LiveBackground'
import MechButton from '@/components/MechButton'
import { Col, Container, Row } from 'react-bootstrap'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <LiveBackground></LiveBackground>
      <Container className={styles.mainTitle} fluid>
        <Row>
          <Col style={{backgroundColor: "purple"}}>
            <Row style={{display: "flex", justifyContent: "center"}}>
              
            </Row>
          </Col>
          <Col>
            <Row><MechButton href={'/roominfo'} text={'Find Room Info'} /></Row>
            <Row><MechButton href={'/availablerooms'} text={'Find Available Rooms'} /></Row>
          </Col>
        </Row>
      </Container>

      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <tr style={{}}>
          <td style={{}}>
            <img src={'icon-light.png'} className={styles.logoIcon} />
            <img src={'condensed-logo-light.png'} className={styles.logoText} />
          </td>
          <td>
            <tr style={{width: "100%"}}><MechButton href={'/roominfo'} text={'Find Room Info'} /></tr>
            <tr><MechButton href={'/availablerooms'} text={'Find Available Rooms'} /></tr>
          </td>
        </tr>
      </div>

    </>
  )
}

/**
 *       <MechButton href={'/roominfo'} text={'FIND ROOM INFO'} />
 */