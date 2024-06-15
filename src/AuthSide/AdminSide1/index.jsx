import React from 'react';
import { Outlet } from 'react-router-dom';

function AdminHome() {
    return (
        <div>
            {/* <h1>Admin Home</h1> */}
            <Outlet />
        </div>
    );
}

export default AdminHome;
