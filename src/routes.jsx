import { useRoutes } from "react-router";
import Landing from "./Layouts/Landing";
import AdminLogin from "./views/Auth/Login/AdminLogin";

export default function Router() {
    let element = useRoutes([
        {
        path:'/',
        element : <Landing /> ,
       },
       
       {
        path:'/admin-login',
        element: <AdminLogin /> 
       },
    ])
    return element
}