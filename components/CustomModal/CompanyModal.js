import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function CompanyModal({ names, element }) {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const sampleOptions = [
    "option1",
    "option2",
    "option3",
    "option4",
  ]
  const sampleState = [
    "key1",
    "key2",
    "key3",
    "key4",
    "key5",
  ]

  return (
    <div >
      <Button style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleOpen}>Create Company</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '300px', width: '100%', border: '1px solid', alignItems: 'center' }}>
          <h2 style={{border:0,padding:0}}>Create Company</h2>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
              <label >Name</label>
              <input placeholder={"Enter Name"} type="text" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
              <label >Description</label>
              <input placeholder={"Enter Description"} type="text" />
            </div>
            <Button style={{ backgroundColor: 'blue', color: 'white' }}>Create Company</Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default CompanyModal    