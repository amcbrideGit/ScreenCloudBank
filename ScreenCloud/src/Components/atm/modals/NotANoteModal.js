import React from "react"
import Modal from "react-bootstrap/Modal";

function NotANoteModal(props) {

    return(
        <Modal centered={true} show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title style={{textAlign: "center"}}>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAllign: "center"}}>
                Please enter a multiple of £5.
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default NotANoteModal;