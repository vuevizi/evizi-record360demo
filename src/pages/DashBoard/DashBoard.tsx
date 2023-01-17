import React from 'react';
import './style.css';
import {useQueryCompanies} from '../../customhooks/useQueryCompanies';
import {Button, Input, Space,Select} from 'antd';
import {DebounceInput} from 'react-debounce-input';
import {DashBoardTable} from '../../components';

const DashBoard: React.FC = () => {
    const {
        data,
        loading,
        error,
        handleNextPage,
        handlePreviousPage,
        handleGoBack,
        handleFilterByInput,
        handleChangeField,
        handleChangeDirection

    } = useQueryCompanies();

    console.log(data?.companies.edges)
    return (
        <div className='dashboard__container'>
            <div className='dashboard__filter'>
                {data?.companies?.edges.length !== 0 &&

                    <Space>

                    <Button
                        onClick={() => handleNextPage(data?.companies.edges[data?.companies.edges.length - 1].cursor)}>Next
                        Page</Button>
                    <Button
                        onClick={() => handlePreviousPage(data?.companies.edges[0].cursor)}>Previous
                        Page</Button>
                        <Input placeholder="Search Place..." onChange={(e)=>handleFilterByInput(e)}></Input>
                        <Select
                            onChange={handleChangeDirection}
                            defaultValue="ASC"
                            style={{ width: 120 }}
                            loading={loading}
                            options={[
                                {
                                    value: 'ASC',
                                    label: 'Increase',
                                },{
                                    value: 'DESC',
                                    label: 'Decrease',
                                },
                            ]}
                        />
                        <Select
                            onChange={handleChangeField}
                            defaultValue="CREATED_AT"
                            style={{ width: 120 }}
                            loading={loading}
                            options={[
                                {
                                    label: 'By Name',
                                    value: 'NAME',
                                },{
                                    label: 'By Id',
                                    value: 'CREATED_AT',
                                },
                            ]}
                        />
                </Space>}


            </div>
            <div className='dashboard__table'>
                <DashBoardTable handleGoBack={handleGoBack} data={data} loading={loading} error={error}></DashBoardTable>
            </div>
        </div>
    );
};

export default DashBoard;