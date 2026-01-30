import { createBrowserRouter, Outlet } from "react-router-dom";
import { Createuser } from "../Page/Create-user";
import PrivateRoute from "../ProtectedRoutes/PrivateRoute";
import Getuser from "../Page/getuser";
import Success from "../Page/success";
import Cencle from "../Page/cencle";
import { Login } from "../Page/Login";
import { lazy, Suspense } from "react";
import PageLoader from "../Page/PageLoader";

// const Home = lazy(() =>
//   new Promise(resolve => {
//     setTimeout(() => resolve(import("../Page/Home")), 2000);
//   })
// );

const Home = lazy(() => import("../Page/Home"))
const Allproduct = lazy(() => import("../Page/products"))
const Getcart = lazy(() => import("../Page/getcart"))
const ODERS = lazy(() => import("../Page/oderss"))



const router = createBrowserRouter([
    {

        path: '/',
        element: <Login></Login>
    },
    {
        path: "/create",
        element: <Createuser></Createuser>
    },
    {
        path: "/success",
        element: <Success></Success>
    },
    {
        path: "/remove",
        element: <Cencle></Cencle>
    },
    {
        element: (

            
                <Suspense fallback={<PageLoader />}><PrivateRoute><Outlet /></PrivateRoute></Suspense>
             
        ),



        children: [
            {

                path: "/home",
                element:
                    <Home />



            },
            {
                path: '/products',
                element:
                    <Allproduct />

            },
            {

                path: "/profile",
                element: <Getuser></Getuser>

            },
            {
                path: "/get",
                element: <Getcart />
            },
            {
                path: "/buy",
                element: <ODERS />

            }

        ]
    }


])

export default router;