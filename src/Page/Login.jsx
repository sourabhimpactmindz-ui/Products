import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { loginUser } from '../services/UserServices/UserServices';
import { toast } from 'react-toastify';

export const Login = () => {
    const[form,setform] = useState('');
    const navigate = useNavigate();

    const handlefun = (e) =>{
      setform({
        ...form,[e.target.name] : e.target.value
      })                                                                             
    }


    const handleform = async (e) => {
  e.preventDefault();
  console.log(form);

  try {
    const response = await loginUser(form);
    console.log(response);

    const { message, status ,token} = response;
    console.log('Message=>',message);


    if (status === true) {
      toast.success("user login sucessfully");
      localStorage.setItem('jwtToken',token);
      navigate('/home');
    }
  } catch (error) {
   toast.error("User error",error);
  }
};


  return (

      <div className="login-container">
        <form>
      <div className="login-box">
        
        <h2>Login Page</h2>

        <div className='email-id'>
        <label htmlFor="email">Email:</label>
        <input id="email" className='email' type='email' placeholder='Enter your email' name='email' onChange={handlefun} ></input>
        </div>
        
        <div className='password-id'>
         <label htmlFor="password">Passsword:</label>
        <input id="password" className='password' type='password' name='password' placeholder='Enter your password'  onChange={handlefun}></input>
        </div>

        <button type='submit' onClick={handleform}>
          Login
        </button>

        <div className='link'>
        <Link to='/create'>Create user</Link>
        </div>
      
      </div>
  </form>
    </div>
  );
};
