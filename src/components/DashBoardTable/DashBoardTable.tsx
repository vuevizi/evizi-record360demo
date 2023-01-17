import React, {memo} from 'react';
import {Button, Table, Tag} from 'antd';
import {DashBoardTableProps} from '../../interfaces/interfaces';

const DashBoardTable: React.FC<DashBoardTableProps> = ({
                                                           data,
                                                           loading,
                                                           error,
    handleGoBack
                                                       }) => {

    const dataSource = data?.companies?.edges?.map(item => {
        const {id, name, active, demo, maxUsers, planLevel} = item.node;
        return {
            id: id,
            name: name,
            active: (active ? <Tag color='green'>Active</Tag> :
                <Tag color='red'>UnActive</Tag>),
            demo: (demo ? <Tag color='green'>Demo</Tag> :
                <Tag color='red'>Not Demo</Tag>),
            maxUsers: maxUsers,
            planLevel: planLevel,
        };
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
        }, {
            title: 'Demo',
            dataIndex: 'demo',
            key: 'demo',
        }, {
            title: 'Max Users',
            dataIndex: 'maxUsers',
            key: 'maxUsers',
        }, {
            title: 'Plan',
            dataIndex: 'planLevel',
            key: 'planLevel',
        },
    ];
    return (
        <>
            {data?.companies.edges.length === 0 &&
                <>
                    <h1>No result matches</h1>
                    <Button onClick={handleGoBack}>Go Back</Button>
                </>

            }
                <Table style={{width: '100%'}} pagination={false}
                       loading={loading}
                       dataSource={dataSource} columns={columns} />

        </>


    );
};

export default memo(DashBoardTable);