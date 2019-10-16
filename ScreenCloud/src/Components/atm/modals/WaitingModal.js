import React from "react"
import Modal from "react-bootstrap/Modal";
import Spinner from 'react-bootstrap/Spinner'
import {Button, CircularProgress} from '@material-ui/core'

function WaitingModal(props) {
    // console.log(props);
    return (
        <Modal className="WaitingModal" centered={true} show={props.show} onHide={props.onHide}>
            <Modal.Header>
            </Modal.Header>
            <Modal.Body style={{textAllign: "center"}}>
                <CircularProgress className="progress" style={{backgroundColor: "white"}} />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}


export default WaitingModal