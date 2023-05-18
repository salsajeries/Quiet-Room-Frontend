import { Inter } from 'next/font/google'
//import styles from '@/styles/Home.module.css'
import MechButton from '../components/MechButton'
import NavbarObj from '@/components/NavbarObj'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <NavbarObj></NavbarObj>
    </>
  )
}

/**
 *       <MechButton href={'/roominfo'} text={'FIND ROOM INFO'} />
 */