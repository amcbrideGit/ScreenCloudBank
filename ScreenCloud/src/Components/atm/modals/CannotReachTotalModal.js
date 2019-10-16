import React from "react"
import Modal from "react-bootstrap/Modal";

function CannotReachTotalModal(props) {

    return(
        <Modal centered={true} show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title style={{textAlign: "center"}}>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAllign: "center"}}>
                We're sorry, but we do not have the notes to fulfill that withdrawal. Please try a lower amount.
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default CannotReachTotalModal;