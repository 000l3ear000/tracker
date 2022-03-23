import React from 'react'
import styles from "../../styles/CustomRender.module.css"


function PlansConfig({checked,setchecked}) {
  return (
    <div className={styles.main}>
      <div className={styles.createBtn}>
        <button onClick={() => setchecked('')}>Back</button>
        {JSON.stringify(checked)}
      </div>
    </div>
  )
}

export default PlansConfig