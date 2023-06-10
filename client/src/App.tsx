
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
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import Cookies from 'js-cookie'
import axios from 'axios';

const queryClient= new QueryClient();

const gelLastUsers = () => {
  return useQuery('lastUsers',()=>{
    return axios.get('http://localhost:4000/user/getLastUsers')
  })
}


const App = () => {
  useEffect(()=>{
    const token=Cookies.get('token')
    if(token){
      setAuthToken(token)
    }
    
    },[])
    
  const [authToken, setAuthToken] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <MyGlobalContext.Provider value= {{ authToken, setAuthToken }}>
        <Navbar/>
        <RoutesComponent />
      </MyGlobalContext.Provider>
    </QueryClientProvider>
  );
};



export default App
