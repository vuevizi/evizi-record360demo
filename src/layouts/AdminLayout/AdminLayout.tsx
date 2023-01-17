import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../Header/Header";

export const AdminLayout = () => {
    return (
        <>
            <Header title="AdminSite 360"/>
            <div className="main__content">
                <Outlet/>
            </div>

        </>
    );
};

