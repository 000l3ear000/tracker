import { Modal, Button, Box } from '@material-ui/core'
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import styles from "../../styles/CustomModal.module.css"
import { companyColumns, productionHallColumns, workplaceColumns, workplaceGroupColumns, castingColumns, productColumns } from '../../helpers/columns';

function CustomModal({ name }) {

    const [open, setOpen] = useState(false);
    const [state, setState] = useState([]);
    const [state1, setState1] = useState([]);
    const [state2, setState2] = useState([]);
    const [state3, setState3] = useState([]);
    const [selectstate1, setselectState1] = useState("");

    const [selector, setSelector] = useState('casting');
    const [tableSelector, setTableSelector] = useState('show_all');
    const [modalSelector, setModalSelector] = useState("product")

    // const [ID,setID]=useState("")

    const [editToggle, setEditToggle] = useState(false);
    const [editState, setEditState] = useState({});
    const [eventTarget, setEventTarget] = useState();

    const handleOpen = () => {
        if (tableSelector) {
            setTableSelector('');
            setOpen(true);
        }
        setOpen(true);

    };
    const handleClose = (event, reason) => {
        if (!tableSelector) {
            setTableSelector('show_all');
            setOpen(false);
        }
        setOpen(false);
        // if ( reason === "backdropClick" ) {
        //     setEditToggle(false); 
        //     setEventTarget('');
        // }
        // if (typeof onClose === "function") {
        //     onClose();
        // }
    };



    const [globalState, setGlobalState] = useState({});
    const [tableState, settableState] = useState([]);


    useEffect(() => {
        if (name !== 'Products') {
            setSelector('');
            setTableSelector('');
        }
    }, [name])

    useEffect(() => {
        // console.log(state, tableSelector);
        const dataExist = JSON.parse(localStorage.getItem("data"));
        if (dataExist) {
            setState1(dataExist);
        }
        else {
            setState1([])
        }
    }, [state])

    // useEffect(() => {
    //     console.log("STATEEEEEEEE>>>>>>", state1.Products)
    // }, [state1])

    // useEffect(() => {
    //     console.log(editState);
    // }, [editState])

    useEffect(() => {
        if (editToggle) autoFill();
    }, [editToggle]);

    const autoFill = () => {
        const dataExist = JSON.parse(localStorage.getItem("data"));
        if (dataExist) {
            const getObject = dataExist[name].filter(obj => obj.id === parseInt(eventTarget));
            if (getObject.length === 1) {
                let editObj = {};
                Object.keys(getObject[0]).forEach(key => {
                    editObj[key] = getObject[0][key];
                })
                if (name === 'Workplace Group') {
                    delete editObj['workplaces']
                    setEditState(editObj);
                } else setEditState(editObj);
            }
        }
    }

    useEffect(() => {
        // console.log('i was called');
        setState(() => data());
        if (selector && tableSelector !== '') productsTableSwitch();
        else tableSwitch();
    }, [tableSelector]);

    // useEffect(() => {
    //     console.log(globalState);
    // }, [globalState])

    // useEffect(() => {
    //     if (tableState.length > 0) {
    //         console.log(tableState)
    //     }
    // }, [tableState])

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
            case "Products":
                settableState([...productColumns]);
                return
        }
    }
    const productsTableSwitch = () => {
        // console.log('i was called');
        switch (selector) {
            case "casting":
                settableState([...productColumns]);
                return
            case "product":
                settableState([...productColumns]);
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

    const addProductEntry = () => {
        if (typeof window !== "undefined") {
            try {
                const checkIfExist = localStorage.getItem('data');
                if (checkIfExist === null || checkIfExist[name] === null) {
                    localStorage.setItem('data', JSON.stringify({
                        [name]: {
                            [modalSelector]: [{ ...globalState, id: 0, selector: modalSelector }],
                        },
                    }))
                    setState([{ ...globalState, id: 0 }]);
                    // setselectState1("");
                    // setState1('');
                    // setState2('');
                    // setState3('');
                }
                else {

                    const getArray = JSON.parse(checkIfExist);
                    if (getArray[name] && getArray[name][modalSelector]?.length > 0) {
                        const _id = getArray[name][modalSelector][getArray[name][modalSelector].length - 1];
                        getArray[name][modalSelector].push({ ...globalState, id: _id.id + 1, selector: modalSelector });
                        localStorage.setItem('data', JSON.stringify({
                            ...getArray,
                        }));
                        setState(getArray[name][modalSelector]);
                        // setselectState1("");
                        // setState1('');
                        // setState2('');
                        // setState3('');
                    } else {
                        localStorage.setItem('data', JSON.stringify({
                            ...getArray,
                            [name]: {
                                ...getArray[name],
                                [modalSelector]: [{ ...globalState, id: 0, selector: modalSelector }],
                            },
                        }))
                        setState([{ ...globalState, id: 0 }]);
                        // setselectState1("");
                        // setState1('');
                        // setState2('');
                        // setState3('');
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
                if (getObject.length === 1) {
                    const getRemainingArray = dataExist[name].filter(obj => obj.id !== parseInt(eventTarget));
                    getRemainingArray.push(editState);
                    localStorage.setItem('data', JSON.stringify({
                        ...dataExist,
                        [name]: getRemainingArray,
                    }))
                    clearEditStates();
                    setState(getRemainingArray);
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


    const deleteProductEntry = event => {
        const type = event.target.value;
        console.log(type);
        if (typeof window !== "undefined") {
            try {
                const checkIfExist = JSON.parse(localStorage.getItem('data'));
                if (checkIfExist !== null) {
                    const getNewArray = checkIfExist[name][type].filter(obj => obj.id !== parseInt(event.target.id))
                    if (getNewArray.length > 0) {
                        localStorage.setItem('data', JSON.stringify({
                            ...checkIfExist,
                            [name]: {
                                ...checkIfExist[name],
                                [type]: getNewArray,
                            }
                        }));
                        setState(getNewArray);
                    } else {
                        // delete checkIfExist[name][type]
                        localStorage.setItem('data', JSON.stringify({
                            ...checkIfExist,
                            [name]: {
                                ...checkIfExist[name],
                                [type]: []
                            }
                        }));
                        setState([...checkIfExist[name][type], ...checkIfExist[name][type]]);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    const clearEditStates = () => {
        setselectState1("");
        setState1('');
        setState2('');
        setState3('');
        setEditToggle(false);
    }

    const columns = [
        ...tableState,
        {
            name: "Action",
            cell: (row) => <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" id={row.id} onClick={editRow} style={{ marginRight: '5px' }} className="btn btn-primary btn-sm">Edit</button>
                <button type="button" id={row.id} value={row.selector} onClick={selector ? deleteProductEntry : deleteEntry} className="btn btn-danger btn-sm">Delete</button>
            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            selector: false,
            center: true
        },
    ];

    const data = () => {
        if (typeof window !== "undefined") {
            const parsed = JSON.parse(localStorage.getItem('data'));
            // localStorage.getItem('data');
            if (!selector && parsed !== null && parsed[name]) return parsed[name];
            if (selector && parsed !== null && parsed[name] && parsed[name][selector]) {
                if (tableSelector === "show_all") {
                    const castings = parsed[name]['casting'] ? parsed[name]['casting'] : [];
                    const products = parsed[name]['product'] ? parsed[name]['product'] : [];
                    return [...castings, ...products];
                } else return parsed[name][selector]
            };
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
                                    <input name="name" placeholder={"Enter Name"} value={editState['name'] ? editState['name'] : ''} type="text" onChange={handleEditState} />
                                </div>
                                <div >
                                    <label >Description</label>
                                    <input name="description" placeholder={"Enter Description"} value={editState['description'] ? editState['description'] : ''} type="text" onChange={handleEditState} />
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

    const plansSetting = () => {
        const companyIndex = state1['Company']?.findIndex(object => object.name === editState.company);
        const productionHallIndex = state1['Production Hall']?.findIndex(object => object.name === editState.production_hall);
        const workplaceGroupIndex = state1['Workplace Group']?.findIndex(object => object.name === editState.name);
        return (
            <Box sx={style}>
                <div className={styles.main}>
                    {
                        editToggle ? (
                            <>
                                <h2>Edit Plan</h2>
                                <div>
                                    <label>Companies</label>
                                    <select name="company" value={editState.company} className={styles.selector} onChange={handleEditState} type="text" >
                                        <option value={companyIndex ? companyIndex : ''}>Select a Company</option>
                                        {
                                            state1['Company']?.map(object => (
                                                <option value={object.name} key={object.id}>{object.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div >
                                    <label >Name</label>
                                    <input name="name" placeholder={"Enter Name"} value={editState['name'] ? editState['name'] : ''} type="text" onChange={handleEditState} />
                                </div>
                                <div>
                                    <label>Production Halls</label>
                                    <select name="production_hall" value={editState.production_hall} className={styles.selector} onChange={handleEditState} type="text" >
                                        <option value={productionHallIndex ? productionHallIndex : ''}>Select a Production Hall</option>
                                        {
                                            state1['Production Hall']?.map(object => (
                                                <option value={object.name} key={object.id}>{object.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label>Workplace Groups</label>
                                    <select name="workplace_groups" value={editState.name} className={styles.selector} onChange={handleEditState} type="text" >
                                        <option value={workplaceGroupIndex ? workplaceGroupIndex : ''}>Select a Workplace Group</option>
                                        {
                                            state1['Production Hall']?.map(object => (
                                                <option value={object.name} key={object.id}>{object.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label>Description</label>
                                    <input name="description" placeholder={"Enter Description"} value={editState['description'] ? editState['description'] : ''} type="text" onChange={handleEditState} />
                                </div>
                                <div className={styles.btnDivs} >
                                    <Button className={styles.btn} onClick={() => updateEntry()} >Submit</Button>
                                    <Button className={styles.btnClose} onClick={() => { handleClose(); setEditToggle(false); setEventTarget('') }} >Close</Button>
                                </div>
                            </>
                        ) : (

                            <>
                                <h2>Add Plan</h2>
                                <div>
                                    <label>Companies</label>
                                    <select name="company" value={editState.company} className={styles.selector} onChange={handleEditState} type="text" >
                                        <option value={companyIndex ? companyIndex : ''}>Select a Company</option>
                                        {
                                            state1['Company']?.map(object => (
                                                <option value={object.name} key={object.id}>{object.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div >
                                    <label >Name</label>
                                    <input name="name" placeholder={"Enter Name"} value={editState['name'] ? editState['name'] : ''} type="text" onChange={handleEditState} />
                                </div>
                                <div>
                                    <label>Production Halls</label>
                                    <select name="production_hall" value={editState.production_hall} className={styles.selector} onChange={handleEditState} type="text" >
                                        <option value={productionHallIndex ? productionHallIndex : ''}>Select a Production Hall</option>
                                        {
                                            state1['Production Hall']?.map(object => (
                                                <option value={object.name} key={object.id}>{object.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div >
                                    <label>Description</label>
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
        const companyIndex = state1['Company']?.findIndex(object => object.name === editState.company);
        // console.log('COMPANY INDEX: ', companyIndex, state1['Company'], editState.company);
        return (
            <Box sx={style}>
                <div className={styles.main}>
                    {
                        editToggle ? (
                            <>
                                <h2 >Edit Production</h2>
                                <div>
                                    <label >Companies</label>
                                    <select name="company" value={editState.company} className={styles.selector} onChange={handleEditState} type="text" >
                                        <option value={companyIndex ? companyIndex : ''}>Select a Company</option>
                                        {
                                            state1['Company']?.map(object => (
                                                <option value={object.name} key={object.id}>{object.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div >
                                    <label >Name</label>
                                    <input name="name" placeholder={"Enter Name"} value={editState['name'] ? editState['name'] : ''} type="text" onChange={handleEditState} />
                                </div>
                                <div className={styles.btnDivs} >
                                    <Button onClick={() => updateEntry()} className={styles.btn}>Submit</Button>
                                    <Button className={styles.btnClose} onClick={handleClose} >Close</Button>
                                </div>
                            </>
                        ) : (
                            <>
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
                            </>
                        )
                    }

                </div>
            </Box>
        )
    }

    const workplaces = () => {
        const companyIndex = state1['Company']?.findIndex(object => object.name === editState.company);
        const productionHallIndex = state1['Production Hall']?.findIndex(object => object.name === editState.production_hall);
        return (
            <Box sx={style}>
                <div className={styles.main}>
                    {
                        editToggle ? (
                            <>
                                <h2 >Edit Workplace</h2>
                                <div>
                                    <label>Companies</label>
                                    <select name="company" value={editState.company} className={styles.selector} onChange={handleEditState} type="text" >
                                        <option value={companyIndex ? companyIndex : ''}>Select a Company</option>
                                        {
                                            state1['Company']?.map(object => (
                                                <option value={object.name} key={object.id}>{object.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div >
                                    <label >Name</label>
                                    <input name="name" placeholder={"Enter Name"} value={editState['name'] ? editState['name'] : ''} type="text" onChange={handleEditState} />
                                </div>
                                <div>
                                    <label>Production Halls</label>
                                    <select name="production_hall" value={editState.production_hall} className={styles.selector} onChange={handleEditState} type="text" >
                                        <option value={productionHallIndex ? productionHallIndex : ''}>Select a Production Hall</option>
                                        {
                                            state1['Production Hall']?.map(object => (
                                                <option value={object.name} key={object.id}>{object.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div >
                                    <label >Rate Per Hour</label>
                                    <input name="rate_per_hour" placeholder={"Enter Rate"} value={editState.rate_per_hour} type="text" onChange={handleEditState} />
                                </div>
                                <div className={styles.btnDivs} >
                                    <Button className={styles.btn} onClick={() => updateEntry()}>Submit</Button>
                                    <Button className={styles.btnClose} onClick={handleClose} >Close</Button>
                                </div>
                            </>
                        ) : (
                            <>
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
                            </>
                        )
                    }

                </div>
            </Box>
        )
    }

    const workplaceGroup = () => {
        const companyIndex = state1['Company']?.findIndex(object => object.name === editState.company);
        const productionHallIndex = state1['Production Hall']?.findIndex(object => object.name === editState.production_hall);
        return (
            <Box sx={style}>
                <div className={styles.main}>
                    {
                        editToggle ? (
                            <>
                                <h2 >Edit Workplace Group</h2>
                                <div>
                                    <label>Name</label>
                                    <input name="name" placeholder={"Enter Name"} value={editState['name'] ? editState['name'] : ''} type="text" onChange={handleEditState} />
                                </div>
                                <div>
                                    <label>Companies</label>
                                    <select name="company" value={editState.company} className={styles.selector} onChange={handleEditState} type="text" >
                                        <option value={companyIndex ? companyIndex : ''}>Select a Company</option>
                                        {
                                            state1['Company']?.map(object => (
                                                <option value={object.name} key={object.id}>{object.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label >Production Halls</label>
                                    <select name="production_hall" value={editState.production_hall} className={styles.selector} onChange={handleEditState} type="text" >
                                        <option value={productionHallIndex ? productionHallIndex : ''}>Select a Production Hall</option>
                                        {
                                            state1['Production Hall']?.map(object => (
                                                <option value={object.name} key={object.id}>{object.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label >Workplaces</label>
                                    <select value={state3} className={styles.selector} onChange={(workplace) => { setState3(workplace.target.value); setEditState({ ...editState, workplaces: editState['workplaces'] ? editState['workplaces'] + ', ' + workplace.target.value : workplace.target.value }) }} type="text" >
                                        <option value="">Select a Workplace</option>
                                        {
                                            state1['Workplace']?.map(object => (
                                                <option value={object.name} key={object.id}>{object.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className={styles.btnDivs} >
                                    <Button className={styles.btn} onClick={() => updateEntry()}>Submit</Button>
                                    <Button className={styles.btnClose} onClick={handleClose} >Close</Button>
                                </div>
                            </>
                        ) : (
                            <>
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
                            </>
                        )
                    }

                </div>
            </Box>
        )
    }

    const products = () => {
        const switchMe = () => {
            switch (modalSelector) {
                case 'casting':
                    return casting();
                case 'product':
                    return product();

                default:
                    break;
            }
        }
        return (
            <Box sx={style}>
                <div className={styles.main}>
                    <div style={{ display: 'flex', margin: '5px', justifyContent: 'flex-end', paddingRight: '-20px' }}>
                        <label htmlFor=""> Select To Create</label>
                        <select name="selector" value={modalSelector} className={styles.selector} onChange={(e) => setModalSelector(e.target.value)} type="text" >
                            <option value="casting" >Casting</option>
                            <option value="product">Product</option>
                        </select>
                    </div>
                    {switchMe()}
                </div>
            </Box >
        )
    }

    const casting = () => {
        return (
            <>
                {
                    editToggle ? (
                        <>
                            <h2>Edit Casting</h2>
                            <div>
                                <label>Name</label>
                                <input name="name" placeholder={"Enter Name"} value={editState['name'] ? editState['name'] : ''} type="text" onChange={handleEditState} />
                            </div>
                            <div>
                                <label>Drawing No.</label>
                                <input name="drawing_no" placeholder={"Enter Description"} value={editState['drawing_no'] ? editState['drawing_no'] : ''} type="text" onChange={handleEditState} />
                            </div>
                            <div>
                                <label>Index</label>
                                <input name="index" placeholder={"Enter Description"} value={editState['index'] ? editState['index'] : ''} type="text" onChange={handleEditState} />
                            </div>
                            <div>
                                <label>Weight</label>
                                <input name="weight" placeholder={"Enter Description"} value={editState['weight'] ? editState['weight'] : ''} type="text" onChange={handleEditState} />
                            </div>
                            <div>
                                <label>Price</label>
                                <input name="price" placeholder={"Enter Description"} value={editState['price'] ? editState['price'] : ''} type="text" onChange={handleEditState} />
                            </div>

                            <div className={styles.btnDivs} >
                                <Button className={styles.btn} onClick={() => updateEntry()} >Submit</Button>
                                <Button className={styles.btnClose} onClick={() => { handleClose(); setEditToggle(false); setEventTarget('') }} >Close</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2>Create Casting</h2>
                            <div>
                                <label>ID</label>
                                <input placeholder={"Enter ID"} value={globalState.ID} type="text" onChange={(text) => setGlobalState({ ...globalState, ID: text.target.value })} />
                            </div>
                            <div>
                                <label>Drawing number</label>
                                <input placeholder={"Enter Drawing number"} value={globalState.drawing_no} type="text" onChange={(text) => setGlobalState({ ...globalState, drawing_no: text.target.value })} />
                            </div>
                            <div>
                                <label>Name</label>
                                <input placeholder={"Enter Name"} value={globalState.name} type="text" onChange={(text) => setGlobalState({ ...globalState, name: text.target.value })} />
                            </div>
                            <div >
                                <label >Weight</label>
                                <input placeholder={"Enter Weight"} value={globalState.weight} type="text" onChange={(text) => setGlobalState({ ...globalState, weight: text.target.value })} />
                            </div>
                            <div >
                                <label >Price</label>
                                <input placeholder={"Enter Price"} value={globalState.price} type="text" onChange={(text) => setGlobalState({ ...globalState, price: text.target.value })} />
                            </div>

                            <div className={styles.btnDivs} >
                                <Button className={styles.btn} onClick={() => addProductEntry()} >Submit</Button>
                                <Button className={styles.btnClose} onClick={handleClose} >Close</Button>
                            </div>
                        </>
                    )
                }
            </>
        )
    }

    const product = () => {
        const castingIndex = state1.length > 0 ? state1['Products']['casting']?.findIndex(object => object.name === editState.casting) : [];
        return (
            <>
                {
                    editToggle ? (
                        <>
                            <h2>Edit Product</h2>
                            <div>
                                <label>Name</label>
                                <input name="name" placeholder={"Enter Name"} value={editState['name'] ? editState['name'] : ''} type="text" onChange={handleEditState} />
                            </div>
                            <div>
                                <label>Drawing No.</label>
                                <input name="drawing_no" placeholder={"Enter Description"} value={editState['drawing_no'] ? editState['drawing_no'] : ''} type="text" onChange={handleEditState} />
                            </div>
                            <div>
                                <label>Index</label>
                                <input name="index" placeholder={"Enter Description"} value={editState['index'] ? editState['index'] : ''} type="text" onChange={handleEditState} />
                            </div>
                            <div>
                                <label>Weight</label>
                                <input name="weight" placeholder={"Enter Description"} value={editState['weight'] ? editState['weight'] : ''} type="text" onChange={handleEditState} />
                            </div>
                            <div>
                                <label>Price</label>
                                <input name="price" placeholder={"Enter Description"} value={editState['price'] ? editState['price'] : ''} type="text" onChange={handleEditState} />
                            </div>
                            {

                                state1.Products?.casting? (
                                    <div>
                                        <label>Castings</label>
                                        <select name="casting" value={editState.casting} className={styles.selector} onChange={handleEditState} type="text" >
                                            <option value={castingIndex ? castingIndex : ''}>Select a casting</option>
                                            {
                                                state1['Products']['casting']?.map(object => (
                                                    <option value={object.name} key={object.id}>{object.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>) : null
                            }
                            <div className={styles.btnDivs} >
                                <Button className={styles.btn} onClick={() => updateEntry()} >Submit</Button>
                                <Button className={styles.btnClose} onClick={() => { handleClose(); setEditToggle(false); setEventTarget('') }} >Close</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2>Create Product</h2>
                            <div>
                                <label>ID</label>
                                <input placeholder={"Enter ID"} value={globalState.ID} type="text" onChange={(text) => setGlobalState({ ...globalState, ID: text.target.value })} />
                            </div>
                            <div>
                                <label>Drawing number</label>
                                <input placeholder={"Enter Drawing number"} value={globalState.drawing_no} type="text" onChange={(text) => setGlobalState({ ...globalState, drawing_no: text.target.value })} />
                            </div>
                            <div>
                                <label>Name</label>
                                <input placeholder={"Enter Name"} value={globalState.name} type="text" onChange={(text) => setGlobalState({ ...globalState, name: text.target.value })} />
                            </div>
                            <div >
                                <label >Weight</label>
                                <input placeholder={"Enter Weight"} value={globalState.weight} type="text" onChange={(text) => setGlobalState({ ...globalState, weight: text.target.value })} />
                            </div>
                            <div >
                                <label >Price</label>
                                <input placeholder={"Enter Price"} value={globalState.price} type="text" onChange={(text) => setGlobalState({ ...globalState, price: text.target.value })} />
                            </div>
                            {
                                state1.Products?.casting ? (
                                <div>
                                    <label >Select a casting</label>

                                    <select value={selectstate1} className={styles.selector} onChange={(casting) => { setselectState1(casting.target.value); setGlobalState({ ...globalState, casting: casting.target.value }) }} type="text" >
                                        <option value="">Select a casting</option>
                                        {
                                            state1['Products']['casting']?.map(object => (
                                                <option value={object.name} key={object.id}>{object.name}</option>
                                            ))
                                        }
                                    </select>

                                </div>
                                ) : null
                            }
                            <div className={styles.btnDivs} >
                                <Button className={styles.btn} onClick={() => addProductEntry()} >Submit</Button>
                                <Button className={styles.btnClose} onClick={handleClose} >Close</Button>
                            </div>
                        </>
                    )
                }
            </>
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
            case 'Products':
                return (
                    products()
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
                {selector && (
                    <>
                        <select name="table_selector" value={tableSelector} className={styles.selector} onChange={(e) => { setTableSelector(e.target.value); e.target.value === "show_all" ? '' : setSelector(e.target.value) }} type="text" >
                            <option value="show_all">Show All</option>
                            <option value="casting">Show Castings</option>
                            <option value="product">Show Products</option>
                        </select>
                    </>
                )}
                <Button className={styles.btn} onClick={handleOpen}>{"Create " + (name == "Products" ? "" : name)}</Button>
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
            {state ? state.length === 0 && <DataTable columns={columns} data={[]} /> : null}
        </>
    )
}

export default CustomModal