import React from 'react';
import "./style.css"
import {useQueryCompanies} from '../../customhooks/useQueryCompanies';
const DashBoard: React.FC = () => {
    const {data, loading, error} = useQueryCompanies({id:"2"});

    return (
        <div className="dashboard__container">
            <div className="dashboard__filter">

            </div>
            <div className="dashboard__table">
                {data?.map((item: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                    <h1>{item.name}</h1>
                ))}
            </div>
        </div>
    );
};

export default DashBoard;