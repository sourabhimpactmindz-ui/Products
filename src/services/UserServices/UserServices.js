import axiosInstance from "../axiosInstance"

export const loginUser=async(data)=>{
    
 try {
    let response=await axiosInstance.post("/login-user",data);
    return response.data;
 } catch (error) {
    console.log(error)
 }
}

export const createuser = async(data) =>{

    try{
        let response = await axiosInstance.post("/create-user",data);
        return response.data
    }catch(err){
        console.log(err)
    }
}


export const getproduct = async() =>{
    try{
        let response = await axiosInstance.get("/get-product")
        return response.data;
    }catch(err){
        console.log(err)
    }
}

export const addcart = async(data) =>{
    console.log(data)
   
    try{
        let response = await axiosInstance.post("/addtocart",data)
        return response.data
    }catch(err){
        console.log(err)

    }
}


export const getusers = async() =>{
    try{
        let response = await axiosInstance.get("/get")
        return response.data;
    }catch(err){
        console.log(err)
    }
}



export const refreshtoken = async() =>{
    try{
        let response = await axiosInstance.get('/refresh')
        return response.data;
    }catch(err){
        console.log(err)
    }
}


export const Getcartproducts =async() =>{
    try {
        let response = await axiosInstance.get("/get-cart")
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const deletecart = async(id) =>{
    try{
        let response = await axiosInstance.delete(`/delete/${id}`)
            return response.data
    }catch(err){
        console.log(err)
    }
}


export const Checkcarts = async(data) =>{
    try{
        let response = await axiosInstance.post('/checkout',data)
        return response.data
    }catch(err){
        console.log(err)
    }
}


export const Logout = async() =>{
    try{
        let response = await axiosInstance.delete("/logout")
        return response

    }catch(err){
        console.log(err)
    }
}