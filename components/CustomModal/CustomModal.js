import { Modal, Button, Box } from '@material-ui/core'
import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import styles from "../../styles/CustomModal.module.css"

function CustomModal({ name }) {

    const [open, setOpen] = useState(false);
    const [state, setState] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [globalState, setGlobalState] = useState({});

    useEffect(() => {
        setState(data());
    }, [])

    const addEntry = () => {
        if (typeof window !== "undefined") {
            try {
                const checkIfExist = localStorage.getItem('data');
                if ( checkIfExist === null ) {
                        localStorage.setItem('data', JSON.stringify({
                            [name]: [{ ...globalState, id: 0 }],
                        }))
                    setState([{ ...globalState, id: 0 }]);
                }
                else {
                    const getArray = JSON.parse(checkIfExist);
                    const _id = getArray[name][getArray[name].length - 1];
                    if ( _id ) {
                        getArray[name].push({ ...globalState, id: _id.id + 1 });
                        localStorage.setItem('data', JSON.stringify({
                            ...getArray,
                        }));
                        setState(getArray[name]);
                    } else {
                        localStorage.setItem('data', JSON.stringify({
                            ...getArray,
                            [name]: [{ ...globalState, id: 0 }],
                        }))
                        setState([{ ...globalState, id: 0 }]);
                    }
                }
                // console.log(localStorage.getItem('data'))
                setGlobalState({});
                handleClose();
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    const updateEntry = (value) => {
        if (typeof window !== "undefined") {
            try {
                const checkIfExist = localStorage.getItem('data');
                if (checkIfExist === null) localStorage.setItem('data', {
                    name: JSON.stringify(value),
                })
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    const deleteEntry = event => {
        if (typeof window !== "undefined") {
            try {
                const checkIfExist = JSON.parse(localStorage.getItem('data'));
                if ( checkIfExist !== null ) {
                    const getNewArray = checkIfExist[name].filter(obj => obj.id !== parseInt(event.target.id))
                    if ( getNewArray.length > 0 ) {
                        localStorage.setItem('data', JSON.stringify({
                            ...checkIfExist,
                            [name]: getNewArray,
                        }));
                        setState(getNewArray);
                    } else {
                        delete checkIfExist[name]
                        localStorage.setItem('data', JSON.stringify({
                            ...checkIfExist,
                            [name]: []
                        }));
                        setState([]);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }
    
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            omit: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            // sortable: true,
        },
        {
            name: "Action",
            cell: (row) => <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" id={row.id} onClick={editRow} style={{ marginRight: '5px' }} className="btn btn-primary btn-sm">Edit</button>
                <button type="button" id={row.id} onClick={viewRow} style={{ marginRight: '5px' }} className="btn btn-warning btn-sm">View</button>
                <button type="button" id={row.id} onClick={deleteEntry} className="btn btn-danger btn-sm">Delete</button>
            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            selector: false,
            center: true
        },
    ];



    const data = () => {
        if (typeof window !== "undefined") {
            // localStorage.getItem('data');
            const parsed = JSON.parse(localStorage.getItem('data'));
            if (parsed !== null) return parsed[name];
            return [];
        }
    }
    const handleChange = value => {
        setSelectedRows(value);
    }

    const editRow = event => {
        console.log(event.target.id);
    };

    const deleteRow = event => {
        // setDeleteEntry(event.target.id);
    };

    const viewRow = event => {
        console.log(event.target.id);
    }

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
                        <input placeholder={"Enter Name"} value={globalState.name} type="text" onChange={(text) => setGlobalState({ ...globalState, name: text.target.value })} />
                    </div>
                    <div >
                        <label >Description</label>
                        <input placeholder={"Enter Description"} value={globalState.description} type="text" onChange={(text) => setGlobalState({ ...globalState, description: text.target.value })} />
                    </div>
                    <div className={styles.btnDivs} >
                        <Button className={styles.btn} onClick={() => addEntry()} >Create Company</Button>
                        <Button className={styles.btnClose} onClick={handleClose} >Close</Button>
                    </div>
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
            {/* <div className={ styles.headerDiv } >

            </div> */}
            <div className={styles.btnn}>
                <Button className={styles.btn} onClick={handleOpen}>{"Create " + name}</Button>
            </div>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    { switchCase() }

                </Modal>
            </div>
            {
                state ? state.length > 0 && (
                    <DataTable
                        title={name}
                        // theme="dark"
                        columns={columns}
                        data={data()}
                        pagination
                    />
                ) : null
            }
            {state ? state.length === 0 && <DataTable columns={columns} data={[]} /> : null}
        </>
    )
}

export default CustomModal