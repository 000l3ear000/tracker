import React from 'react'
import styles from "../../styles/CustomRender.module.css"
import CustomModal from '../CustomModal/CustomModal'

function ProductionHall() {
  return (
    <div className={styles.main}>
    <div className={styles.createBtn}>
    <CustomModal name="Production Hall"/>
    </div>
</div>
  )
}

export default ProductionHall