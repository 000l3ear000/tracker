import React from 'react'
import styles from "../../styles/CustomRender.module.css"
import CustomModal from '../CustomModal/CustomModal'

function WorkplaceGroup() {
  return (
    <div className={styles.main}>
      <div className={styles.createBtn}>
        <CustomModal name="Workplace Group" />
      </div>
    </div>
  )
}

export default WorkplaceGroup