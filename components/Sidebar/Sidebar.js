import React,{useState,useEffect} from 'react'
import styles from '../../styles/Sidebar.module.css'
import CustomLeftIcons from './CustomLeftIcons'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ReceiptIcon from '@material-ui/icons/Receipt';
// import PaymentsIcon from '@mui/icons-material/Payments';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import SettingsIcon from '@material-ui/icons/Settings';
// import ContactsIcon from '@mui/icons-material/Contacts';


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
        <CustomLeftIcons setPage={setPage} setChecked={setChecked} checked={checked} text="Plans Setting" icon={<AssignmentIcon />} />

        {/* <CustomLeftIcons setPage={setPage} setChecked={setChecked} checked={checked} text="ORDERS" icon={<AssignmentIcon />} /> */}

    </div>
  )
}

export default Sidebar