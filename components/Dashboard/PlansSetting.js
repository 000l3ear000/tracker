import React from 'react'
import styles from "../../styles/CustomRender.module.css"
import CustomModal from '../CustomModal/CustomModal'


function PlansSetting() {
    return (
        <div className={styles.main}>
            <div className={styles.createBtn}>
                <CustomModal name="Plans Setting" />
            </div>
        </div>
    )
}

export default PlansSetting