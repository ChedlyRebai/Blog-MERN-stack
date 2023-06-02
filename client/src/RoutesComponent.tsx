import React from 'react'


import Forbidden from './components/errorComponents/Forbidden';
import Login from './components/Login';
import Signup from './components/Signup';
import Forgotpassword from './components/Forgotpassword';
import Userprofile from './components/Userprofile';
import CreatePost from './components/Createpost';
import AricleDetails from './components/AricleDetails';
import Articles from './components/Articles';

import Addpost from './components/Addpost';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Notfound from './components/errorComponents/Notfound';
import Settings from './components/Settings';
import Dashboard from './components/Dashboard';
const RoutesComponent=()=> {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/ArticleDetails" Component={AricleDetails} />
        <Route path="/Dashboard" Component={Dashboard} />
        {/* <Route path="/Sidebar" Component={Sidebar} /> */}
        <Route path="/" Component={Articles} />
        <Route path="/createpost" Component={CreatePost} />
        <Route path="/forgetPassword" Component={Forgotpassword} />
        <Route path="/userprofile" Component={Userprofile} />
        <Route path="/signup" Component={Signup} />
        <Route path="/login" Component={Login} />
        <Route path="/not" Component={Notfound} />
        <Route path="/for" Component={Forbidden} />
        <Route path="/Addpost" Component={Addpost} />
        <Route path="/Setting" Component={Settings} />
        
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default RoutesComponent;




