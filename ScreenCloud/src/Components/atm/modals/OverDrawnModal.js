import React from "react"
import Modal from "react-bootstrap/Modal";
import Button from '@material-ui/core'

function OverDrawnModal(props) {
    return(
        <Modal centered={true} show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title style={{textAlign: "center"}}>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAllign: "center"}}>
                <p>This withdrawal would put you over your overdraw limit of £100. Please withdraw £{props.state.balance + 100} or less.</p>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default OverDrawnModal