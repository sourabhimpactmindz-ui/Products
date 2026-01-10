import React, { useEffect, useState } from 'react'
import {Checkcarts, deletecart, Getcartproducts } from '../services/UserServices/UserServices'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export const  Getcart=()=> {
  const [carts,setcart] = useState([])
  const navigate = useNavigate()
  const fatchcart = async() =>{
    try{
    const res = await Getcartproducts();
    setcart(res.cart.products || [])
    }catch(err){
      console.log(err)
    }
  }


  useEffect(() =>{
    fatchcart()
  },[])

  const Removecart = async(id)=>{
    try{
      const res = await deletecart(id);
      console.log(res)
      setcart(prev => prev.filter(item => item.product._id !== id))
      fatchcart()
      toast.success("Product successfully removed")
    }catch(err){
      toast.error("Something error")
      console.log(err)
    }
}




const totalamount = carts.length > 0
  ? carts.reduce((total, item) => total + item.product.price * item.quantity, 0)
  : 0;


const checkoutHandler = async() =>{
  try{
    const res = await Checkcarts()
    if(res.url){
      window.location.href = res.url
    }

  }catch(err){
    console.log(err)
  }

}



return (
  <>
  <div className="backbutton-get">
  <button onClick={() => navigate("/home")}>← Back</button>
</div>
  <div className="cart-container">
  
    
    <h2>My Cart</h2>

    {carts.length > 0 ? (
      <>
        <div className="cart-wrapper">
          {carts.map((item) => (
            <div className="cart-card" key={item.product._id}>
              <h3 className="cart-title">{item.product.name}</h3>

              <p className="cart-desc">{item.product.description}</p>

              <div className="cart-row">
                <span className="cart-price">${item.product.price}</span>
                <span className="cart-qty">Qty: {item.quantity}</span>
              </div>

              <div className="cart-total">
                Total: ${item.product.price * item.quantity}
              </div>

              <button
                className="remove-btn"
                onClick={() => Removecart(item.product._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* CHECKOUT SECTION */}
        <div className="checkout-section">
          <h3>Grand Total: ${totalamount }</h3>
          <button className="checkout-btn" onClick={checkoutHandler}>
            Checkout
          </button>
        </div>
      </>
    ) : (
      <p className="empty-cart">Your cart is empty</p>
    )}

  </div>
  
</>  

);
}


export default Getcart