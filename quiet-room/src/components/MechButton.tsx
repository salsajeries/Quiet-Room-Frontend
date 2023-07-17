import styles from '../styles/MechButton.module.css'
import Card from 'react-bootstrap/Card'
import Link from 'next/link'

interface MechButtonProps {
    href: string;
    text: string;
    width?: string;
    height?: string;
    fontSize?: string;
}

export default function MechButton(props: MechButtonProps) {
    return (
        <Link href={props.href} style={{textDecoration: 'none'}} className={styles.linkElement}>
            <Card className={styles.buttonCard} style={{width: props.width, height: props.height, fontSize: props.fontSize}}>
                {props.text}
            </Card>
        </Link>
    );
}