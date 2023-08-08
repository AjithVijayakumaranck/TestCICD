import React from 'react'
import Style from './Style.module.css'
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom";



const DataTables = ({ Title, Links, Path, Row, Columns, ActionColumn }) => {

    const customStyles = {
        rows: {
            style: {
                cursor: 'pointer',
                borderBottom: '1px solid lightGrey',
                minWidth: '12px',
                fontSize: '14px',
            },
        },

        headCells: {
            style: {
                backgroundColor:'#046BD2',
                color:'white',
                paddingLeft: '25px', // override the cell padding for head cells
                fontWeight: 'Bold',
                fontSize: '14px',
                minWidth: '12px',

            },
        },

    };

    

    return (

        <div className={Style.datatable}>
            <div className={Style.datatableTitle}>
                {Title}
                {Links ? <Link to={`/admin/${Path}/form`} className={Style.link}>
                    {Links}
                </Link> : null}
            </div>

            <DataTable
                className={Style.datagrid}
                columns={Columns}
                customStyles={customStyles}
                data={Row}
                pagination
                selectableRows
                fixedHeader
            />
        </div>

    )
}

export default DataTables