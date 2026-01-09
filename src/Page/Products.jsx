import React, { useEffect, useState } from 'react';
import { addcart, getproduct } from '../services/UserServices/UserServices';
import { toast } from 'react-toastify';


export const Allproducts = () => {
  const [products,setProducts] = useState([]);
  const [count,setcounter] =useState([]);

    
    const fatchproduct = async() =>{
      try{
     const res = await getproduct();
     setProducts(res.product || [])

      }catch(err){
        console.log(err)
        setProducts([])
      }

    }



const increment = (id) => {
  setcounter((prev) => {
    const existingid = prev.find((item) => item.id === id);

    if (existingid){
      return prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      return [...prev, { id: id, quantity: 1 }];
    }
  });
};



const decrement = (id) => {
  setcounter((prev) => {
    const existingItem = prev.find(item => item.id === id);

    if (!existingItem) return prev;

    if (existingItem.quantity === 1) {
      return prev.filter(item => item.id !== id);
    }

    return prev.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  });
};



const addtocart  = async(id)=>{

  let quantity = count.find((item)=> item.id===id)
  if(!quantity || !quantity.quantity ){
    toast.error("Quantity required ❌");
    return;
  }

let data ={
  id:id,
  quantity:quantity?.quantity
}
try{
  const res = await addcart(data);
toast.success("Successfully added to cart 🛒");

}catch(err){
  console.log(err)
}

}

    useEffect(() =>{
      fatchproduct()

    },[])
    
    const getQuantity = (id) =>
      count.find(item => item.id === id)?.quantity || 0;

    return (
    <div className="products-container">
      <h2>All Products</h2>

     <div className="card-wrapper">
  {products.length > 0 ? (
    products.map((item) => (
      <div className="product-card">
        <h3>Name : {item.name}</h3>
        <p>Description : {item.description}</p>
        <p className="price">Price : ${item.price}</p>
        <div className='counter'>
          <button className="btn" onClick={() => increment(item?._id)}>+ {item.quantity}</button>
        <div className='count'>{getQuantity(item._id)}</div>

          <button className="btn" onClick={() => decrement(item?._id)}>- {item.quantity}</button>
        </div>
        <button onClick={()=>addtocart(item?._id)}>
          Add-cart
        </button>
      </div>
    ))
  ) : (
    <p>No products found</p>
  )}
</div>
</div>
)}