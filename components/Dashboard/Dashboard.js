import React from 'react'
import Company from './Company'
import PlansSetting from './PlansSetting'
import Products from './Products'
import ProductionHall from './ProductionHall'
import Workplace from './Workplace'
import WorkplaceGroup from './WorkplaceGroup'
import Operation from './Operation'
// import Products from './Products';

function Dashboard({ checked }) {
    const router = () => {
        switch (checked) {
            case "Company":
                return (
                    <Company />
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
            case "Products":
                return (
                    <Products />
                )
            case "Operation":
                return (
                    <Operation />
                )
            case "Plans Setting":
                return (
                    <PlansSetting />
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