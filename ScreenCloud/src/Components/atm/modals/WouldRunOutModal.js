import React from "react"
import Modal from "react-bootstrap/Modal";

function WouldRunOutModal(props) {

    return(
        <Modal centered={true} show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title style={{textAlign: "center"}}>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAllign: "center"}}>
                We're sorry, but we do not have the funds to process that withdrawal. Please withdraw a smaller amount.
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default WouldRunOutModal;