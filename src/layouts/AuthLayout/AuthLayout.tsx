import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from "../Header/Header";


export const AuthLayout: React.FC = () => {
    return (
        <>
            <Header title="Login Site 360"/>
            <div className="main__content">
                <Outlet/>
            </div>

        </>
    );
};

