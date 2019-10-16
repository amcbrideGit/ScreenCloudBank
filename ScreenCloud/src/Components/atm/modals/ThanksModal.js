import React from "react"
import Modal from "react-bootstrap/Modal";
import Spinner from 'react-bootstrap/Spinner'
import {Button, CircularProgress} from '@material-ui/core'

function ThanksModal(props) {

    return (
        <Modal className="WaitingModal" centered={true} show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body style={{textAllign: "center"}}>
                <p>Your withdrawal was successful.</p>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.onClickClose} className="btn btn-primary">Close</button>
            </Modal.Footer>
        </Modal>
    )
}


export default ThanksModal