import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { fetchUserFile, fetchUserFiles } from '../reduxToolkit/extraReducer';
import Files from './Files/Files';
import { auth, db,} from '../Api/firebaseConfig';
import '../styles/Home.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { deleteDoc, doc } from 'firebase/firestore';
const Home = ({user}) => {
  const dispatch = useDispatch();
  const {userFiles, loadingFiles,loading} = useSelector(state=>state.files)

  const [files, setFiles] = useState([])
  const logoutFunction = ( )=>{
    auth.signOut()
  }
  const handleDelete = (id, name) => {
    var confirmed = window.confirm(`Are you sure to delete this file`)
    if(confirmed){
        const storage = getStorage();
    const storageRef = ref(storage, name);
    deleteObject(storageRef).then(() => {
      console.log('File deleted successfully');
      deleteDoc(doc(db, 'files', id)).then(() => {
        console.log('Document deleted successfully');
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
    }
  };
  var userId = user.uid
  useEffect(() => {
    if(!loading){
      dispatch(fetchUserFile(userId));
    }
  }, [loadingFiles, handleDelete]);
// if(!loading){
//   return <h5>Loading</h5>
// }
var arr = [userFiles[0], userFiles[1]]
console.log(arr)
var trueFalse = true;
  return (
    <div>
    <p className="titles">Dropbox</p>
      <Files user={user}/>
      {userFiles?.map((file)=>(
        <span className="files" key={file.id}><a className="myHref" href={file.url}>{file.filename}</a><button className="deleteBtn" onClick={()=>handleDelete(file.id, file.name)}><DeleteIcon color="dangerous"/></button></span>
      ))}
    </div>
  )
}

export default Home