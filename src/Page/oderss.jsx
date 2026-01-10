import React, { useEffect, useState } from "react";
import { Buysproduct } from "../services/UserServices/UserServices";
import { useNavigate } from "react-router-dom";


const ODERS = () => {
    const [buy,setbuy] = useState([]);
    const navigate = useNavigate();

    const fatchbuy = async() =>{
        const res = await Buysproduct()
        setbuy(res.buy || [])
    }

    useEffect(() =>{
        fatchbuy()
    },[])

    return(
        <>
    
        <div className="title">
  <h1 >Order Summary</h1>
  </div>
<div className="orders-container">
  {buy.length === 0 ? (
    <p className="empty">No orders found</p>
  ) : (
    buy.map((order) => (
      <div className="order-card" key={order._id}>
     
        <div className="order-header">
          <span><strong>Order ID:</strong> {order._id}</span>
          <span className={`status ${order.status}`}>
            {order.status}
          </span>
        </div>

       
        <div className="table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {order.products.map((item, i) => (
                <tr key={i}>
                  <td>{item.name || item.product?.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

    
        <div className="order-footer">
          <span>Grand Total</span>
          <strong>${order.totalamount}</strong>
        </div>
      </div>
    ))
  )}
</div>


<div className="backbutton">
  <button onClick={() => navigate("/home")}>← Back</button>
</div>

        </>
    )

}

export default ODERS;
