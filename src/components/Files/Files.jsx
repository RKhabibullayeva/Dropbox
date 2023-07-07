import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../Api/firebaseConfig';
import { uploadFile } from '../../reduxToolkit/extraReducer';
import './files.css'
import { Button } from '@mantine/core';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Modal, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../styles/Home.css'
const Files = ({user}) => {
  const {loading, loadingFiles} = useSelector(state=>state.files)
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [userUid, setUserUid] = useState('')
    const [toggle, setToggle] = useState(false)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)
    const [selectedValue, setSelectedValue] = useState() 
    const style = {
      position: 'absolute',
      top: '100px',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 600,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
    const handleLogOut = ()=>{
      var confirmValue = window.confirm('are want Log out')
      if(confirmValue){
        auth.signOut().then(alert("User logouted"))
      }
    }
    var navigate = useNavigate()
    const handleSubmit = (e) => {
      e.preventDefault();
      if (file && userUid) {
        dispatch(uploadFile({file,userUid}));
      }
    }
    useEffect(()=>{
        setOpen(false)
      auth.onAuthStateChanged((user)=>{
        setUserUid(user)
      })
    }, [])

  return (
    <>
<Button onClick={handleOpen} className='uploadBtn'>Upload</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
   <form onSubmit={handleSubmit}>
  <div>
   <label for="formFileLg" class="form-label">Select a file</label>
   <input className="form-control form-control-lg" id="formFileLg" type="file" onChange={handleFileChange}/>
  </div>
  <div>
   <button className='btn btn-primary'>Upload</button>
  </div>
 </form>
  </Box>
</Modal>
<div className='dropdown_container'>
<select class="form-select" aria-label="Default select example">
  <option selected>{user &&(user.displayName)}</option>
  <option value="setting">setting</option>
  <option value="files">Files</option>
</select>
</div>
<div className="logOut_container">
  <button className="btn btn-danger" onClick={handleLogOut}>LogOut</button>
</div>
<hr/>
    </>
  )
}

export default Files