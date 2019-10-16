import React from "react";
import ReactDom from "react-dom"
import Modal from "react-bootstrap/Modal";
import { CircularProgress } from "@material-ui/core";


function DepositModal(props) {
    
    var waiting = props.waiting;

    return(
        <Modal centered={true} show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                {waiting? null: <Modal.Title style={{textAlign: "center"}}>How much would you like to Deposit?</Modal.Title>}
            </Modal.Header>
            <Modal.Body className={waiting? "progressBody": null}style={{textAllign: "center"}}>
                {waiting? <CircularProgress className="progress" style={{backgroundColor: "white", textAllign: "center"}} />:
                    <form className="withdraw-form" onSubmit={props.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="withdrawAmount" >Amount</label>
                            <input onChange={props.onChange} type="text" className="form-control" id="withdrawAmount" aria-describedby="emailHelp" placeholder="Enter Amount" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                }
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default DepositModal