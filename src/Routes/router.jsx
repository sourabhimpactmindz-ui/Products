import { createBrowserRouter } from "react-router-dom";

import { Home } from "../Page/Home";
import { Createuser } from "../Page/Create-user";
import { Allproducts } from "../Page/products";
import PrivateRoute from "../ProtectedRoutes/PrivateRoute";
import Getuser from "../Page/getuser";
import { Getcart } from "../Page/getcart";
import Success from "../Page/success";
import Cencle from "../Page/cencle";
import ODERS from "../Page/oderss";
import { Login } from "../Page/Login";





const router = createBrowserRouter([
{
    
    path:'/',
    element:<Login></Login>
},
{
    path:"/create",
    element:<Createuser></Createuser>
},
{
    path : "/success",
    element:<Success></Success>
},
{
    path : "/remove",
    element : <Cencle></Cencle>
},
{
    element:<PrivateRoute/>,
    children:[
        {
            path:'/home',
            element:<Home/>
        },
        {
            path : '/products',
            element:<Allproducts/>
        },
       {

        path : "/profile",
        element : <Getuser></Getuser>

       },
       {
        path:"/get",
        element:<Getcart></Getcart>
       },
       {
        path:"/buy",
        element : <ODERS></ODERS>
       }

    ]
}


])

export default router;