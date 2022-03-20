import React from 'react'
import styles from "../../styles/CustomRender.module.css"
import CustomModal from '../CustomModal/CustomModal'



function Products() {
  return (
    <div className={styles.main}>
      <div className={styles.createBtn}>
        <CustomModal enteries={["Id", "Name", "Description"]} name="Products" />
      </div>
    </div>
  )
}

export default Products