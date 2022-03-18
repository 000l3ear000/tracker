import { Modal, Button, Box } from '@material-ui/core'
// import { TransitEnterexitSharp } from '@material-ui/icons';
import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import styles from "../../styles/CustomModal.module.css"
import { companyColumns, productionHallColumns, workplaceColumns, workplaceGroupColumns } from '../../helpers/columns';

function CustomModal({ name, enteries }) {

    const [open, setOpen] = useState(false);
    const [state, setState] = useState([]);
    const [state1, setState1] = useState([]);
    const [state2, setState2] = useState([]);
    const [state3, setState3] = useState([]);
    const [selectstate1, setselectState1] = useState("");

    const [editToggle, setEditToggle] = useState(false);
    const [editState, setEditState] = useState({});
    const [eventTarget, setEventTarget] = useState();

    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false) };



    const [globalState, setGlobalState] = useState({});
    const [tableState, settableState] = useState([]);


    useEffect(() => {
        const dataExist = JSON.parse(localStorage.getItem("data"));
        if (dataExist) {
            setState1(dataExist);
        }
        else {
            setState1([])
        }
    }, [state])
    
    useEffect(() => {
        console.log(editState);
    }, [editState])

    useEffect(() => {
        autoFill();
    }, [editToggle]);

    const autoFill = () => {
        const dataExist = JSON.parse(localStorage.getItem("data"));
        const getObject = dataExist[name].filter(obj => obj.id === parseInt(eventTarget));
        if ( getObject.length === 1 ) {
            let editObj = {};
            Object.keys(getObject[0]).forEach(key => {
                editObj[key] = getObject[0][key];
            })
            setEditState(editObj);
        }
    }

    useEffect(() => {
        setState(() => data());
        tableSwitch();
    }, [])

    // useEffect(() => {
    //     console.log(globalState);
    // }, [globalState])

    useEffect(() => {
        if (tableState.length > 0) {
            console.log(tableState)
        }
    }, [tableState])

    const tableSwitch = () => {
        switch (name) {
            case "Company":
                settableState([...companyColumns]);
                return
            case "Production Hall":
                settableState([...productionHallColumns]);
                return
            case "Workplace":
                settableState([...workplaceColumns]);
                return
            case "Workplace Group":
                settableState([...workplaceGroupColumns]);
                return

        }
    }

    const addEntry = () => {
        if (typeof window !== "undefined") {
            try {
                const checkIfExist = localStorage.getItem('data');
                if (checkIfExist === null) {
                    localStorage.setItem('data', JSON.stringify({
                        [name]: [{ ...globalState, id: 0 }],
                    }))
                    setState([{ ...globalState, id: 0 }]);
                    setselectState1("");
                    setState1('');
                    setState2('');
                    setState3('');
                }
                else {
                    const getArray = JSON.parse(checkIfExist);
                    if (getArray[name]?.length > 0) {
                        const _id = getArray[name][getArray[name].length - 1];
                        getArray[name].push({ ...globalState, id: _id.id + 1 });
                        localStorage.setItem('data', JSON.stringify({
                            ...getArray,
                        }));
                        setState(getArray[name]);
                        setselectState1("");
                        setState1('');
                        setState2('');
                        setState3('');
                    } else {
                        localStorage.setItem('data', JSON.stringify({
                            ...getArray,
                            [name]: [{ ...globalState, id: 0 }],
                        }))
                        setState([{ ...globalState, id: 0 }]);
                        setselectState1("");
                        setState1('');
                        setState2('');
                        setState3('');
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

    const updateEntry = () => {
        if (typeof window !== "undefined") {
            try {
                const dataExist = JSON.parse(localStorage.getItem('data'));
                const getObject = dataExist[name].filter(obj => obj.id === parseInt(eventTarget));
                if ( getObject.length === 1 ) {
                    const getRemainingArray = dataExist[name].filter(obj => obj.id !== parseInt(eventTarget));
                    getRemainingArray.push(editState);
                    localStorage.setItem('data', JSON.stringify({
                        ...dataExist,
                        [name]: getRemainingArray,
                    }))
                    handleClose();
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    const deleteEntry = event => {
        if (typeof window !== "undefined") {
            try {
                const checkIfExist = JSON.parse(localStorage.getItem('data'));
                if (checkIfExist !== null) {
                    const getNewArray = checkIfExist[name].filter(obj => obj.id !== parseInt(event.target.id))
                    if (getNewArray.length > 0) {
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
        ...tableState,
        {
            name: "Action",
            cell: (row) => <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" id={row.id} onClick={editRow} style={{ marginRight: '5px' }} className="btn btn-primary btn-sm">Edit</button>
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
            if (parsed !== null && parsed[name]) return parsed[name];
            return [];
        }
    }
    const handleChange = value => {
        setSelectedRows(value);
    }

    const editRow = event => {
        console.log(event.target.id);
        setEventTarget(event.target.id);
        setEditToggle(true);
        handleOpen();
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


    const handleEditState = (event) => {
        setEditState(prev => {
            return { ...prev, [event.target.name]: event.target.value }
          })
    }

    const company = () => {
        return (
            <Box sx={style}>
                <div className={styles.main}>
                {
                    editToggle ? (
                        <>
                                <h2>Edit Company</h2>
                                <div>
                                    <label >Name</label>
                                    <input name="name" placeholder={"Enter Name"} value={ editState['name'] ? editState['name'] : '' } type="text" onChange={handleEditState} />
                                </div>
                                <div >
                                    <label >Description</label>
                                    <input name="description" placeholder={"Enter Description"} value={ editState['description'] ? editState['description'] : '' } type="text" onChange={handleEditState} />
                                </div>
                                <div className={styles.btnDivs} >
                                    <Button className={styles.btn} onClick={() => updateEntry()} >Submit</Button>
                                    <Button className={styles.btnClose} onClick={() => { handleClose(); setEditToggle(false); setEventTarget('') }} >Close</Button>
                                </div>
                                </>
                                ) : (
                            
                            <>
                                <h2>Create Company</h2>
                                <div>
                                    <label >Name</label>
                                    <input placeholder={"Enter Name"} value={globalState.name} type="text" onChange={(text) => setGlobalState({ ...globalState, name: text.target.value })} />
                                </div>
                                <div >
                                    <label >Description</label>
                                    <input placeholder={"Enter Description"} value={globalState.description} type="text" onChange={(text) => setGlobalState({ ...globalState, description: text.target.value })} />
                                </div>
                                <div className={styles.btnDivs} >
                                    <Button className={styles.btn} onClick={() => addEntry()} >Submit</Button>
                                    <Button className={styles.btnClose} onClick={handleClose} >Close</Button>
                                </div>
                            </>
                        )
                    }

                </div>
            </Box>
        )
    }

    const productionHall = () => {
        const arrayExist = JSON.parse(localStorage.getItem('data'));
        if (arrayExist !== null) {
            try {
                const getCompanyArray = arrayExist[name]
            } catch (error) {

            }
        }
        return (
            <Box sx={style}>
                <div className={styles.main}>
                    <h2 >Create Production</h2>
                    <div>
                        <label >Companies</label>
                        <select value={selectstate1} className={styles.selector} onChange={(company) => { setselectState1(company.target.value); setGlobalState({ ...globalState, company: company.target.value, companyId: company.key }) }} type="text" >
                            <option value="">Select a Company</option>
                            {
                                state1['Company']?.map(object => (
                                    <option value={object.name} key={object.id}>{object.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div >
                        <label >Name</label>
                        <input placeholder={"Enter Name"} value={globalState.name} type="text" onChange={(text) => setGlobalState({ ...globalState, name: text.target.value })} />
                    </div>
                    <div className={styles.btnDivs} >
                        <Button onClick={() => addEntry()} className={styles.btn}>Submit</Button>
                        <Button className={styles.btnClose} onClick={handleClose} >Close</Button>
                    </div>

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
                        <select value={selectstate1} className={styles.selector} onChange={(company) => { setselectState1(company.target.value); setGlobalState({ ...globalState, company: company.target.value, companyId: company.key }) }} type="text" >
                            <option value="">Select a Company</option>
                            {
                                state1['Company']?.map(object => (
                                    <option value={object.name} key={object.id}>{object.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div >
                        <label >Name</label>
                        <input placeholder={"Enter Name"} value={globalState.name} type="text" onChange={(text) => setGlobalState({ ...globalState, name: text.target.value })} />
                    </div>
                    <div>
                        <label >Production Halls</label>
                        <select value={state2} className={styles.selector} onChange={(productionHall) => { setState2(productionHall.target.value); setGlobalState({ ...globalState, production_hall: productionHall.target.value }) }} type="text" >
                            <option value="">Select a Production Hall</option>
                            {
                                state1['Production Hall']?.map(object => (
                                    <option value={object.name} key={object.id}>{object.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div >
                        <label >Rate Per Hour</label>
                        <input placeholder={"Enter Rate"} value={globalState.rate_per_hour} type="text" onChange={(text) => setGlobalState({ ...globalState, rate_per_hour: text.target.value })} />
                    </div>
                    <div className={styles.btnDivs} >
                        <Button className={styles.btn} onClick={() => addEntry()}>Submit</Button>
                        <Button className={styles.btnClose} onClick={handleClose} >Close</Button>
                    </div>

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
                        <input placeholder={"Enter Name"} value={globalState.name} type="text" onChange={(text) => setGlobalState({ ...globalState, name: text.target.value })} />
                    </div>
                    <div>
                        <label >Companies</label>
                        <select value={selectstate1} className={styles.selector} onChange={(company) => { setselectState1(company.target.value); setGlobalState({ ...globalState, company: company.target.value, companyId: company.key }) }} type="text" >
                            <option value="">Select a Company</option>
                            {
                                state1['Company']?.map(object => (
                                    <option value={object.name} key={object.id}>{object.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label >Production Halls</label>
                        <select value={state2} className={styles.selector} onChange={(productionHall) => { setState2(productionHall.target.value); setGlobalState({ ...globalState, production_hall: productionHall.target.value }) }} type="text" >
                            <option value="">Select a Production Hall</option>
                            {
                                state1['Production Hall']?.map(object => (
                                    <option value={object.name} key={object.id}>{object.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label >Workplaces</label>
                        <select value={state3} className={styles.selector} onChange={(workplace) => { setState3(workplace.target.value); setGlobalState({ ...globalState, workplaces: globalState['workplaces'] ? globalState['workplaces'] + ', ' + workplace.target.value : workplace.target.value }) }} type="text" >
                            <option value="">Select a Workplace</option>
                            {
                                state1['Workplace']?.map(object => (
                                    <option value={object.name} key={object.id}>{object.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={styles.btnDivs} >
                        <Button className={styles.btn} onClick={() => addEntry()}>Submit</Button>
                        <Button className={styles.btnClose} onClick={handleClose} >Close</Button>
                    </div>

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
                    onBackdropClick={() => { setEditToggle(false); setEventTarget('') }}
                >
                    {switchCase()}

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
            {console.log(state1)}
            {state ? state.length === 0 && <DataTable columns={columns} data={[]} /> : null}
        </>
    )
}

export default CustomModal