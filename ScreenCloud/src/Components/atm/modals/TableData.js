import React from "react"
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import Columns from "./columns.json"

function TableData(props) {
        const columns = Columns
        return (
            <ReactTable
            data={props.data}
            columns={columns}
            />
        )
}

export default TableData