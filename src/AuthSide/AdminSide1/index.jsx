import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../page/components/Navbar';

function AdminHome() {
    return (
        <div>
            {/* <h1>Admin Home</h1> */}
            {/* <Navbar /> */}
            <Outlet />
        </div>
    );
}

export default AdminHome;
