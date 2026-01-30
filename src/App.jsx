import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/router'
import { refreshtoken } from './services/UserServices/UserServices'


function App() {
  const fatchrefresh = async() =>{
    try{
    const res = await refreshtoken();
    
    const {token} = res;
    localStorage.setItem("jwtToken",token);
    }catch(err){
      console.log(err)
    }
  } 

  useEffect(() =>{
    fatchrefresh()
  },[])
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    
    
    </>
  )
}

export default App