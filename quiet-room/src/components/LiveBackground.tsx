import React from "react"
import styles from '../styles/LiveBackground.module.css'

function LiveBackground() {
    return (
      <>
        <img src={'circle-design.png'} className={styles.circle1} />
        <img src={'circle-design.png'} className={styles.circle2} />
        <img src={'circle-design.png'} className={styles.circle3} />
        <img src={'circle-design.png'} className={styles.circle4} />
        <img src={'circle-design.png'} className={styles.circle5} />
        <img src={'circle-design.png'} className={styles.circle6} />
      </>
    );
  }
  
  export default LiveBackground;