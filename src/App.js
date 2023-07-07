import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './Api/firebaseConfig';
import UserSetting from './components/UserSetting'
function App() {
  const [user, setUser] = useState('')
  const [dropDown, setDrop] = useState()
  auth.onAuthStateChanged((user)=>{
    setUser(user)
  })
  useEffect(()=>{
    var dropDown = JSON.parse(localStorage.getItem('dropdown'))
    console.log(dropDown)
    if(dropDown){
      setDrop(dropDown)
    }
  })
  return (
    <>
    <Routes>
      <Route path='/home' element={ user? <Home user={user}/> :<Login/>} />
      <Route path='/' element={user?<Home user={user}/>:<Login/>} />
      <Route path='/register' element={user?<Home user={user}/>:<Register/>} />
      <Route  path='/home' element={dropDown==='setting'? <UserSetting/> : user?<Home/>:<Login/>}/>
    </Routes>
    </>
  );
}

export default App;