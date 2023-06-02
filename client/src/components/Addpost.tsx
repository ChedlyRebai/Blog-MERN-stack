import React from 'react'
import { useState } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';


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

function Addpost() {

  
const [files, setFiles] = useState<FileList | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  /*const {values, errors, touched, handleBlur,handleChange, handleSubmit} = useFormik({
    initialValues: {
     title:"",
     
     content: '' 
   },
   validationSchema: Yup.object().shape({
    title: Yup.string()
    .required('title is required')
    .matches(/^[a-zA-Z0-9_]*$/, 'Please enter a valid title (only letters, numbers, and underscores)'),
     text: Yup.string()
       .required('Content is required'),
   }),
   onSubmit
});*/


  async function createNewPost(e:any){
  e.preventDefault();
  const data= new FormData();
  if(title){
  data.set('title',title);
}
  data.set('text',content);
  if (files && files.length > 0) {
    data.set('file', files[0]);
  }
  
  console.log(data)
  
  //const token=Cookies.get('token')
  const token = Cookies.get('token');
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

if (token) {
  data.set('token', token);
}

try {
  await axios.post(`http://localhost:4000/post/creat/${token}`, data, config).then((response) => {
    successNotify('Added');
  });
} catch (error) {
  console.error(error);
}

}
  return (
    <>
    {/* component */}
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">Responsive Form</h2>
          <p className="text-gray-500 mb-6">
            Form is mobile responsive. Give it a try.
          </p>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Post Details</p>
                <p>Please fill out all the fields.</p>
              </div>
              <div className="lg:col-span-2">
                <form onSubmit={createNewPost}>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                  <div className="md:col-span-5">
                    <label htmlFor="title">title </label>
                    <input 
name="title" id="title" 
value={title}
onChange={ev=>setTitle(ev.target.value)}
                      type="text"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      
                      placeholder='title'
                    />
                   
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="image">Image</label>
                    <input
    type="file"
    onChange={ev => setFiles(ev.target.files)}
    name="image"
    id="image"
    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
  />
                  </div>
                  
                  <div  className="md:col-span-5">
                     <ReactQuill value={content}
onChange={value=>setContent(value)} id="content" />

                  </div>
                   
                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <a
          href="https://www.buymeacoffee.com/dgauderman"
          target="_blank"
          className="md:absolute bottom-0 right-0 p-4 float-right"
        >
          <img
            src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg"
            alt="Buy Me A Coffee"
            className="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"
          />
        </a> */}
      </div>
    </div>
    <ToastContainer />
  </>

  
  )
}

export default Addpost
