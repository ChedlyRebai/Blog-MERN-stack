
import './App.css'

import { BrowserRouter, Route, Routes,} from 'react-router-dom';
import Home from './components/Home';
import Notfound from './components/errorComponents/Notfound';
import './index.css';
import {Fragment, useEffect, useState} from 'react'
import Forbidden from './components/errorComponents/Forbidden';
import Login from './components/Login';
import Signup from './components/Signup';
import Forgotpassword from './components/Forgotpassword';
import Userprofile from './components/Userprofile';
import CreatePost from './components/Createpost';
import AricleDetails from './components/AricleDetails';
import Articles from './components/Articles';
//import Sidebar from './components/Sidebar';
import Addpost from './components/Addpost';
import RoutesComponent from './RoutesComponent';
import { Sidebar } from 'flowbite-react';
import Navbar from './components/Navbar';
import { createContext } from 'react';
import { MyGlobalContext } from './hooks/MyGlobalContext';

import Cookies from 'js-cookie'


const App = () => {
  useEffect(()=>{
    const token=Cookies.get('token')
    if(token){
      setAuthToken(token)
    }
    
    },[])
    
  const [authToken, setAuthToken] = useState('');

  const navStyle = { position: 'fixed', top: 0, left: 0, right: 0 };

  return (
    <MyGlobalContext.Provider value= {{ authToken, setAuthToken }}>
    
      <Navbar/>
     
      <RoutesComponent />
    </MyGlobalContext.Provider>
  );
};



export default App
