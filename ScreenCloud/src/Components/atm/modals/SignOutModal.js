import React from "react"
import Modal from "react-bootstrap/Modal";
import {Button} from '@material-ui/core'
function SignOutModal(props) {
    // console.log(props);
    return (
        <Modal className="SignOutModal" centered={true} show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title style={{textAlign: "center"}}>Are you sure you want to sign out?</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAllign: "center"}}>
            </Modal.Body>
            <Modal.Footer>
                <button id="noButton" className="btn btn-secondary" onClick={props.onClickNo}>No</button>
                <button id="yesButton" className="btn btn-primary" onClick={props.onClickYes}>Yes</button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignOutModal