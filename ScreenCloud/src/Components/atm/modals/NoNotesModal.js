import React from "react"
import Modal from "react-bootstrap/Modal";

function NoNotesModal(props) {
    return(
        <Modal centered={true} show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title style={{textAlign: "center"}}>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAllign: "center"}}>
                We're sorry, but this machine has run out of notes. We apologise for the inconvenience.
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default NoNotesModal