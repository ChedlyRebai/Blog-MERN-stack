import React, { useState } from 'react'
import {  NavLink } from 'react-router-dom'
import {Navigate} from "react-router-dom";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const onSubmit = async (values: any) => {

    try{
        await axios.post('http://localhost:4000/auth/register',{ username:values.username,email:values.email,password: values.password})
        .then((data:any)=>{ 
            successNotify(data.data);
            console.log(data);
            <Navigate to={'/'} /> 

        } )
        .catch((error:any)=>{errorNotify(error.response.data)
            console.log(error.response.data)
        });
        
    }catch(error){
         
    }   
    
};









const errorNotify = (error:String) => toast.error(`${error}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

const successNotify = (result: string) =>toast.success(`${result}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

function Signup() {

    const [redirect,setRedirect]=useState(false);

    if (redirect) {
        return <Navigate to={'/'} />
    }
    

    const style={
        backgroundImage: `url('https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`
    }

    const {values, errors, touched, handleBlur,handleChange, handleSubmit} = useFormik({
        initialValues: {
         username:"",
       
         password: "",
         confirmpassword:""
       },
       validationSchema: Yup.object().shape({
        username: Yup.string()
        .required('Username is required')
        .matches(/^[a-zA-Z0-9_]*$/, 'Please enter a valid username (only letters, numbers, and underscores)'),
   

        
         password: Yup.string().required('Password is required').min(5) ,
         confirmpassword:Yup.string().oneOf([Yup.ref("password"),""],"Password must match").required("Confirm password is required")

       }),
       onSubmit
   });
   console.log(errors)


  return (
    <>
    
     
<div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
            <div className="f1 hidden bg-cover lg:block lg:w-2/3" style={style}>
                <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                    <div>
                        <h2 className="text-4xl font-bold text-white">Brand</h2>
                        
                        <p className="max-w-xl mt-3 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus molestiae</p>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                <div className="flex-1">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Brand</h2>
                        
                        <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
                    </div>

                    <div className="mt-8">
                        <form  onSubmit={handleSubmit}>
                        <div>   
                                <label htmlFor="username" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Username</label>
                                <input type="text"  onChange={handleChange} onBlur={handleBlur} value={values.username} name="username" id="username" placeholder="Username" className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300     focus:outline-none focus:ring focus:ring-opacity-40 ${errors.username && touched.username ? "border-red-500 focus:ring-red-400 dark:focus:border-red-400 focus:border-red-400" : "dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400"}`} />
                                {errors.username && touched.username && <p className='text-red-500'>{errors.username}</p>}
                            </div>
                           

                            <div className="mt-6">
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>                
                                </div>
                                
                                <input type="password" name="password" id="password" onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder="Your Password" className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300     focus:outline-none focus:ring focus:ring-opacity-40 ${errors.password && touched.password ? "border-red-500 focus:ring-red-400 dark:focus:border-red-400 focus:border-red-400" : "dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400"}`} />
                                {errors.password && touched.password && <p className='text-red-500'>{errors.password}</p>}
                            </div>

                            <div className="mt-6">
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="confirmpassword" className="text-sm text-gray-600 dark:text-gray-200">Confirm Password</label>
                                    
                                </div>

                                <input type="password" name="confirmpassword" id="confirmpassword" onChange={handleChange} onBlur={handleBlur} value={values.confirmpassword } placeholder="Confirm Your Password" className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300     focus:outline-none focus:ring focus:ring-opacity-40 ${errors.confirmpassword && touched.confirmpassword ? "border-red-500 focus:ring-red-400 dark:focus:border-red-400 focus:border-red-400" : "dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400"}`} />
                                {errors.confirmpassword && touched.confirmpassword && <p className='text-red-500'>{errors.confirmpassword}</p>}
                            </div>

                            <div className="mt-6">
                                <button type="submit"
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-rose-500 rounded-md hover:bg-rose-400 focus:outline-none focus:bg-rose-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    Sign in
                                </button>
                            </div>

                        </form>

                        <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <NavLink to="/signup" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</NavLink>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ToastContainer />
    
    </>
  )
}

export default Signup