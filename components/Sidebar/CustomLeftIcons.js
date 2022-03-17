import React from 'react'
import styles from '../../styles/CustomLeftIcons.module.css'


function CustomLeftIcons({ icon, text, setPage,setChecked, checked }) {

    const handleClick = () =>{
        setPage(text);
        setChecked(text)
    }

    return (
        <div onClick={() => handleClick()} className={text == checked ? styles.root1 : styles.root}>
            {icon}
            <p>{text}</p>
        </div>
    )
}

export default CustomLeftIcons