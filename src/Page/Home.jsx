import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Allproducts } from './products';



export const Home = () =>{
 return (
    <>
    <div className="home-container">
      <div className="btn-group">
        <Link to='/get'>Get-Cart</Link>
        <Link to='/profile'>Profile</Link>
      </div>
    </div>
<Allproducts></Allproducts>
    </>
  );
};