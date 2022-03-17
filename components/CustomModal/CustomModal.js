import { Modal, Button, Box } from '@material-ui/core'
import React, { useState } from 'react'
import styles from "../../styles/CustomModal.module.css"

function CustomModal({ name }) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const company = () => {
        return (
            <Box sx={style}>
                <div className={styles.main}>
                    <h2 >Create Company</h2>
                    <div>
                        <label >Name</label>
                        <input placeholder={"Enter Name"} type="text" />
                    </div>
                    <div >
                        <label >Description</label>
                        <input placeholder={"Enter Description"} type="text" />
                    </div>
                    <Button className={styles.btn}>Create Company</Button>
                </div>
            </Box>
        )
    }

    const productionHall = () => {
        return (
            <Box sx={style}>
                <div className={styles.main}>
                    <h2 >Create Production</h2>
                    <div>
                        <label >Companies</label>
                        <select className={styles.selector} type="text" >
                            <option value="">Select a Company</option>
                            <option value="1">Company1</option>
                            <option value="2">Company2</option>
                        </select>
                    </div>
                    <div >
                        <label >Name</label>
                        <input placeholder={"Enter Name"} type="text" />
                    </div>
                    <Button className={styles.btn}>Create Production</Button>
                </div>
            </Box>
        )
    }

    const workplaces = () => {
        return (
            <Box sx={style}>
                <div className={styles.main}>
                    <h2 >Create Workplace</h2>
                    <div>
                        <label >Companies</label>
                        <select className={styles.selector} type="text" >
                            <option value="">Select a Company</option>
                            <option value="1">Company1</option>
                            <option value="2">Company2</option>
                        </select>
                    </div>
                    <div >
                    <label >Name</label>
                    <input placeholder={"Enter Name"} type="text" />
                    </div>
                    <div>
                        <label >Production Halls</label>
                        <select className={styles.selector} type="text" >
                            <option value="">Select a Production Hall</option>
                            <option value="1">Production Hall 1</option>
                            <option value="2">Production Hall 1</option>
                        </select>
                    </div>
                    <div >
                        <label >Rate Per Hour</label>
                        <input placeholder={"Enter Name"} type="text" />
                    </div>
                    <Button className={styles.btn}>Create Workplace</Button>
                </div>
            </Box>
        )
    }

    const workplaceGroup = () => {
        return (
            <Box sx={style}>
                <div className={styles.main}>
                    <h2 >Create Workplace Group</h2>
                    <div>
                        <label >Name</label>
                        <input placeholder={"Enter Name"} type="text" />
                    </div>
                    <div>
                        <label >Companies</label>
                        <select className={styles.selector} type="text" >
                            <option value="">Select a Company</option>
                            <option value="1">Production Hall 1</option>
                            <option value="2">Production Hall 1</option>
                        </select>
                    </div>
                    <div>
                        <label >Production Halls</label>
                        <select className={styles.selector} type="text" >
                            <option value="">Select a Production Hall</option>
                            <option value="1">Production Hall 1</option>
                            <option value="2">Production Hall 1</option>
                        </select>
                    </div>
                    <div>
                        <label >Workplaces</label>
                        <select className={styles.selector} type="text" >
                            <option value="">Select a Workplace</option>
                            <option value="1">Production Hall 1</option>
                            <option value="2">Production Hall 1</option>
                        </select>
                    </div>
                    <Button className={styles.btn}>Create Workplace Group</Button>
                </div>
            </Box>
        )
    }




    const switchCase = () => {
        switch (name) {
            case 'Company':
                return (
                    company()
                )
            case 'Production Hall':
                return (
                    productionHall()
                )
            case 'Workplace':
                return (
                    workplaces()
                )
            case 'Workplace Group':
                return (
                    workplaceGroup()
                )
            default:
                return (
                    <div>404</div>
                )
        }
    }

    return (
        <>
            <Button style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleOpen}>{"Create "+name}</Button>

            <div >
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    {switchCase()}
                </Modal>
            </div>



        </>
    )
}

export default CustomModal