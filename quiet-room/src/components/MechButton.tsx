import styles from '../styles/MechButton.module.css'
import Card from 'react-bootstrap/Card'
import Link from 'next/link'

interface MechButtonProps {
  href: string
  text: string
  width?: string
  height?: string
  fontSize?: string
}

export default function MechButton(props: MechButtonProps) {
  return (
    <Link href={props.href} style={{ textDecoration: 'none' }} className={styles.linkElement}>
      <Card
        style={{ width: props.width, height: props.height, fontSize: props.fontSize }}
        className={styles.buttonCard}
      >
        {props.text}
      </Card>
    </Link>
  )
}
