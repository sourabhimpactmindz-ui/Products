import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createuser } from "../services/UserServices/UserServices";
import { toast } from "react-toastify";

export const Createuser = () => {
  const [form, setform] = useState("");
  const navigate = useNavigate();

  const handlefunn = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleform = async (e) => {
    try{

        e.preventDefault();
    const create = await createuser(form);
    const { status } = create;
    if (status) {
      toast.success("User created successfully")
      navigate("/");
    }else{
      toast.error("User error")
    }
    }catch(err){
      console.log(err)
    }
  
  };
  return (
    <div className="login-container">
      <form>
        <div className="login-box">
          <h2>Create Account</h2>

          <div className="email-id">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              className="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handlefunn}
            ></input>
          </div>

          <div className="password-id">
            <label htmlFor="password">Passsword:</label>
            <input
              id="password"
              className="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handlefunn}
            ></input>
          </div>

          <div className="password-id">
            <label htmlFor="city">City:</label>
            <input
              id="city"
              className="password"
              type="text"
              name="city"
              placeholder="Enter your city"
              onChange={handlefunn}
            ></input>
          </div>

          <button type="submit" onClick={handleform}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
