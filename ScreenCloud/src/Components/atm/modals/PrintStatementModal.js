import React from "react"
import ReactTable from "react-table"
import Modal from "react-bootstrap/Modal";
import {Button} from '@material-ui/core'
import TableData from "./TableData"
import store from 'store';
import { CircularProgress } from "@material-ui/core";
function PrintStatementModal(props) {
    // console.log(props);
    return (
        <Modal className="SignOutModal" centered={true} show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title style={{textAlign: "center"}}>Statement for {store.get("name")}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAllign: "center"}}>
                <TableData data={props.data}/>
            </Modal.Body>
            <Modal.Footer>
                <button id="yesButton" className="btn btn-primary" onClick={props.onHide}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default PrintStatementModal