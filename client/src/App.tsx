
import './App.css'
import { BrowserRouter, Route, Routes,} from 'react-router-dom';
import Home from './components/Home';
import Notfound from './components/errorComponents/Notfound';
import './index.css';
import {Fragment} from 'react'
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

function App() {
  const navStyle = { position: 'fixed', top: 0, left: 0, right: 0 };

  return (
    <>
      <Navbar />
      <RoutesComponent />
    </>
  );
}

export default App
