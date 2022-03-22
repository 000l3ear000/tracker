import React from 'react'
import styles from "../../styles/CustomRender.module.css"
import CustomModal from '../CustomModal/CustomModal'

function Operation() {
    return (
        <div className={styles.main}>
            <div className={styles.createBtn}>
                <CustomModal name="Operations" />
            </div>
        </div>
    )
}

export default Operation