import React, { useEffect, useRef, useState } from 'react';
import NET from 'vanta/dist/vanta.net.min'; // You can use GLOBE or HALO too
import * as THREE from 'three';
import styles from '../styles/VantaBackground.module.css';

const VantaBackground = ({ children }) => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          minHeight: 600,
          minWidth: 600,
          scale: 1.0,
          color: 0x6be2f3,
          backgroundColor: 0x0a0a0a,
          points: 10.0,
          maxDistance: 20.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className={styles.vantaContainer}>
      <div className={styles.overlay}>
        {children}
      </div>
    </div>
  );
};

export default VantaBackground;
