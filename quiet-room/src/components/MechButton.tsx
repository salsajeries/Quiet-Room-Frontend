import styles from '../styles/MechButton.module.css'
import Card from 'react-bootstrap/Card'
import Link from 'next/link'
import SearchIcon from '@mui/icons-material/Search'
import { Stack, Typography } from '@mui/material'

interface MechButtonProps {
  href: string
  text: string
  width?: string
  height?: string
  fontSize?: string
  search?: boolean
}

export default function MechButton(props: MechButtonProps) {
  
  if (props.search) {
    return (
      <Link href={props.href} style={{ textDecoration: 'none' }} className={styles.linkElement}>
        <Card
          style={{ width: props.width, height: props.height }}
          className={styles.buttonCard}
        >
          <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
            <SearchIcon style={{ fontSize: props.fontSize, marginRight: '10px' }} />
            <Typography fontSize={props.fontSize}>{props.text}</Typography>
          </Stack>
        </Card>
      </Link>
    )
  }
  else {
    return (
      <Link href={props.href} style={{ textDecoration: 'none' }} className={styles.linkElement}>
        <Card
          style={{ width: props.width, height: props.height }}
          className={styles.buttonCard}
        >
          <Typography fontSize={props.fontSize}>{props.text}</Typography>
        </Card>
      </Link>
    )
  }
  
}
