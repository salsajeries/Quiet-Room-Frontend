import styles from '../styles/MechButton.module.css'
import Card from 'react-bootstrap/Card'
import Link from 'next/link'

interface MechButtonInt {
    href: string;
    text: string;
}

export default function MechButton(props: MechButtonInt) {
    return (
        <Link href={props.href} style={{textDecoration: 'none'}}>
            <Card className={styles.buttonCard}>
                {props.text}
            </Card>
        </Link>
    );
}