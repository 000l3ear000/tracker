import React, {useState,useEffect} from 'react'
import styles from '../../styles/HomePage.module.css'
import Dashboard from '../Dashboard/Dashboard'
import Nav from '../Nav/Nav'
import Sidebar from '../Sidebar/Sidebar'


function HomePage() {
  const [checked, setChecked] = useState('Company');

  return (
    <>
      <div className={styles.main}>
        <div className={styles.nav}>
          <Nav/>
        </div>
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <Sidebar checked={checked} setChecked={setChecked}/>
          </div>
          <div className={styles.dashboard}>
            <Dashboard checked={checked}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage