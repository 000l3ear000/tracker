import React from 'react'
import CompanyModal from '../CustomModal/CompanyModal'
import styles from "../../styles/CustomRender.module.css"
import CustomModal from '../CustomModal/CustomModal'

function Company() {
    return (
        <div className={styles.main}>
            <div className={styles.createBtn}>
                <CustomModal enteries={["Id","Name","Description"]} name="Company" />
            </div>
        </div>
    )
}

export default Company