import React from "react";
import ReactDom from "react-dom"
import Modal from "react-bootstrap/Modal";
import { CircularProgress } from "@material-ui/core";


function WithdrawModal(props) {
    
    var waiting = props.waiting;

    return(
        <Modal centered={true} show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                {waiting? null: <Modal.Title style={{textAlign: "center"}}>How much would you like to withdraw?</Modal.Title>}
            </Modal.Header>
            {waiting? null: props.state.notes.fives==0 || props.state.notes.tens==0 || props.state.notes.twenties==0?
                <p style={{color:"red", textAlign: "center"}}>We have run out of the following notes:
                    {props.state.notes.fives==0? "£5 ": null} 
                    {props.state.notes.tens==0? "£10 ": null}
                    {props.state.notes.twenties==0? "£20 ": null}
                </p>:null
             }
            
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

export default WithdrawModal