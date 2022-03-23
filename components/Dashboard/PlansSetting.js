import React,{useState} from 'react'
import styles from "../../styles/CustomRender.module.css"
import CustomModal from '../CustomModal/CustomModal'
import PlansConfig from './PlansConfig';


function PlansSetting() {
    
    const [checked, setchecked] = useState("")

    return (
        <div className={styles.main}>
                        
            <div className={styles.createBtn}>
                { !checked?
                (<CustomModal name="Plans Setting" checked={setchecked} />):
                (<PlansConfig checked={checked} setchecked={setchecked}/>)
                }
            </div>
            
            
        </div>
    )
}

export default PlansSetting