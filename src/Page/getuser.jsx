import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getusers} from '../services/UserServices/UserServices';

export const  Getuser = () => {
  const navigate = useNavigate();
const [profile , setprofile] = useState([]);

const fatchuser = async() =>{
  try {
    const res = await getusers();
    setprofile(res.user || [])

  } catch (err) {
    console.log(err)
  }
}

useEffect(() =>{
  fatchuser()
},[])



return (
  <>
  <div className="profile-container">
    <div className="profile-card">
      <h2>User Profile</h2>

      <div className="profile-item">
        <span>Email:</span>
        <p>{profile.email}</p>
      </div>

      <div className="profile-item">
        <span>City:</span>
        <p>{profile.city}</p>
      </div>

      <div className="profile-item">
        <span>Profile Created On:</span>
        <p>
          {profile.createdAt
            ? new Date(profile.createdAt).toLocaleDateString()
            : ""}
        </p>
      </div>
      {/* <div className='log'>
    <button onClick={logoutuser}>Logout</button>
  </div> */}
    </div>
      
  </div>

  </>
);
}


export default Getuser