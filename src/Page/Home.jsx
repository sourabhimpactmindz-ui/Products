import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Allproducts } from './products';
import { useNavigate } from 'react-router-dom';



export const Home = () =>{
  const navigate = useNavigate()
  const handle = () =>{
    console.log('logut')
    localStorage.removeItem("jwtToken")
    navigate('/')

  }
 return (
    <>
    <div className="home-container">
      <div className="btn-group">
        <Link to='/get'>Get-Cart</Link>
        <Link to='/profile'>Profile</Link>
        <Link to="/buy">Buy Products</Link>
         <Link onClick={() =>handle()}>Logout</Link>
      </div>
    </div>
<Allproducts></Allproducts>

    </>
  );
};