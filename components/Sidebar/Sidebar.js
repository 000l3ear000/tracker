import React, { useState } from 'react'
import styles from '../../styles/Sidebar.module.css'
import CustomLeftIcons from './CustomLeftIcons'
import AssignmentIcon from '@material-ui/icons/Assignment';


function Sidebar({checked,setChecked}) {

    // const [checked, setChecked] = useState('Dashboard');
    const [page, setPage] = useState('Production Hall');

  return (
    <div className={styles.main}>
        <CustomLeftIcons setPage={setPage} setChecked={setChecked} checked={checked} text="Company" icon={<AssignmentIcon />} />
        <CustomLeftIcons setPage={setPage} setChecked={setChecked} checked={checked} text="Production Hall" icon={<AssignmentIcon />} />
        <CustomLeftIcons setPage={setPage} setChecked={setChecked} checked={checked} text="Workplace" icon={<AssignmentIcon />} />
        <CustomLeftIcons setPage={setPage} setChecked={setChecked} checked={checked} text="Workplace Group" icon={<AssignmentIcon />} />
        <CustomLeftIcons setPage={setPage} setChecked={setChecked} checked={checked} text="Products" icon={<AssignmentIcon />} />

        {/* <CustomLeftIcons setPage={setPage} setChecked={setChecked} checked={checked} text="ORDERS" icon={<AssignmentIcon />} /> */}

    </div>
  )
}

export default Sidebar