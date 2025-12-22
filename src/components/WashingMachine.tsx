'use client';

import { useEffect, useState } from 'react';
import styles from './WashingMachine.module.css';

interface WashingMachineProps {
  id: number;
  status: 'available' | 'washing' | 'drying' | 'wash_dry' | 'finished';
  washTimeLeft?: string;
  dryTimeLeft?: string;
}

export function WashingMachine({ id, status, washTimeLeft, dryTimeLeft }: WashingMachineProps) {
  const [isWashing, setIsWashing] = useState(false);
  const [isDrying, setIsDrying] = useState(false);

  useEffect(() => {
    setIsWashing(status === 'washing' || status === 'wash_dry');
    setIsDrying(status === 'drying' || status === 'wash_dry');
  }, [status]);

  return (
    <div className={styles.washingMachineContainer}>
      <div className={`${styles.washingMachine} ${styles[status]}`}>
        {/* Top Control Panel */}
        <div className={styles.controlPanel}>
          <div className={`${styles.statusLight} ${styles[status]}`}></div>
          <div className={styles.controlButtons}>
            <div className={styles.button}></div>
            <div className={styles.button}></div>
            <div className={styles.button}></div>
          </div>
        </div>

        {/* Main Body - Stacked Design */}
        <div className={styles.machineBody}>
          {/* Drying Compartment (Top) */}
          <div className={styles.dryerSection}>
            <div className={styles.door}>
              <div className={styles.doorGlass}>
                <div className={`${styles.drum} ${isDrying ? styles.tumbling : ''}`}>
                  <div className={`${styles.agitatorLine} ${styles.line1}`}></div>
                  <div className={`${styles.agitatorLine} ${styles.line2}`}></div>
                  <div className={`${styles.agitatorLine} ${styles.line3}`}></div>
                  <div className={`${styles.agitatorLine} ${styles.line4}`}></div>
                  {isDrying && <div className={styles.heatEffect}></div>}
                </div>
              </div>
              <div className={styles.doorHandle}></div>
            </div>
          </div>

          {/* Washing Compartment (Bottom) */}
          <div className={styles.washerSection}>
            <div className={styles.door}>
              <div className={styles.doorGlass}>
                <div className={`${styles.drum} ${isWashing ? styles.rotating : ''}`}>
                  <div className={`${styles.agitatorLine} ${styles.line1}`}></div>
                  <div className={`${styles.agitatorLine} ${styles.line2}`}></div>
                  <div className={`${styles.agitatorLine} ${styles.line3}`}></div>
                  <div className={`${styles.agitatorLine} ${styles.line4}`}></div>
                  {isWashing && <div className={styles.waterEffect}></div>}
                </div>
              </div>
              <div className={styles.doorHandle}></div>
            </div>
          </div>
        </div>

        {/* Base/Support */}
        <div className={styles.machineBase}>
          <div className={styles.feet}>
            <div className={styles.foot}></div>
            <div className={styles.foot}></div>
            <div className={styles.foot}></div>
            <div className={styles.foot}></div>
          </div>
        </div>
      </div>

      {/* Status Text */}
      <div className={styles.statusText}>
        {status === 'available' && 'Tersedia'}
        {(status === 'washing' || status === 'drying' || status === 'wash_dry') && (
          <div className={styles.inUseInfo}>
            {status === 'washing' && <div>Mencuci</div>}
            {status === 'drying' && <div>Mengeringkan</div>}
            {status === 'wash_dry' && <div>Mencuci + Mengeringkan</div>}
            {washTimeLeft && <div className={styles.timer}>Cuci: {washTimeLeft}</div>}
            {dryTimeLeft && <div className={styles.timer}>Kering: {dryTimeLeft}</div>}
          </div>
        )}
        {status === 'finished' && 'Selesai - Siap Ambil'}
      </div>
    </div>
  );
}
