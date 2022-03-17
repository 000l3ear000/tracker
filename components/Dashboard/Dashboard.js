import React from 'react'
import Nav from '../Nav/Nav'
import Company from './Company'
import ProductionHall from './ProductionHall'
import Workplace from './Workplace'
import WorkplaceGroup from './WorkplaceGroup'
// import styles from '../../styles/Dashboard/Dashboard.module.css'

function Dashboard({ checked }) {
    const router = () => {
        switch (checked) {
            case "Company":
                return(
                    <Company/>
                )
            case "Workplace":
                return (
                    // <div>Hello</div>
                    <Workplace />
                )
            case "Production Hall":
                return (
                    <ProductionHall />
                )
            case "Workplace Group":
                return (
                    <WorkplaceGroup />
                )
            default:
                return (
                    <div>Hello</div>
                )
        }
    }


    return (
        // <div className={styles.main}>
        <>
            {router()}
        </>
        // </div>
            
    )

}

export default Dashboard