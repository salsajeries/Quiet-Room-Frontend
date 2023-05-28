import React from "react"
import styles from '../styles/LiveBackground.module.css'

function LiveBackground() {
    return (
      <div className={styles.videoContainer}>
        <video 
          autoPlay muted loop id="myVideo"
          className={styles.videoStyle} 
          src={'live-background.mp4'}
        />
      </div>
    );
  }
  
  export default LiveBackground;