import React from 'react';
import store from 'store';
import Container from "react-bootstrap/Container"
import isLoggedIn from "../loginForm/LoggedIn"
import { Button, ButtonGroup, AppBar, Toolbar, IconButton, Typography, Avatar} from '@material-ui/core';
import WithdrawModal from './modals/WithdrawModal';
import NotANoteModal from './modals/NotANoteModal';
import WouldRunOutModal from './modals/WouldRunOutModal';
import NoNotesModal from './modals/NoNotesModal';
import OverDrawnModal from './modals/OverDrawnModal';
import ThanksModal from './modals/ThanksModal';
import ATMNav from '../navbar/ATMNav';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import CannotReachTotalModal from './modals/CannotReachTotalModal';
import "./ATM.css"
import PrintStatementModal from './modals/PrintStatementModal';
import data from "./data.json"
const Redirect  = require("react-router-dom").Redirect;
const withdraw= require('./withdraw/withdraw');

class Atm extends React.Component {

    constructor() {
        super();
        this.state = {
            notes: {}
        };

        //Vars for holding data
        this.withdrawState={}
        this.value=""
        this.tableData= data;
        this.statementData = JSON.stringify(data);

        //Functions for showing modals/warnings
        this.onWithdraw= this.onWithdraw.bind(this);
        this.openSignOutModal = this.openSignOutModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openWithdrawModal = this.openWithdrawModal.bind(this);
        this.openNoNotesModal = this.openNoNotesModal.bind(this);
        this.signout = this.signout.bind(this);
        this.openPrintStatement = this.openPrintStatement.bind(this);
    }

    //Signs out, sets page to login page
    signout() {
        store.set("loggedIn", false);
        store.set("bankState", null);
        store.set("tableData",null);
        this.props.history.push('/login');
    }

    //Closes any modal on screen
    closeModal() {
        this.setState( prevState =>({
            signoutVisible: false,
            thanks: false,
            printStatementVisible: false,
            withdrawvisible: false,
            warningVisible: false,
            noNotesVisible: false,
            notANoteVisible: false,
            wouldRunOutVisible: false,
            pastLimit: false,
            cannotProvideNotes: false,
            notes: prevState.notes,
            balance: prevState.balance,
            noNotes: prevState.noNotes
        }));
        setTimeout(()=>{
            store.set("bankState", this.state);
        },1000)
    }
    
    //Opens the signout modal
    openSignOutModal() {
        this.setState( prevState =>({
            signoutVisible : true,
            withdrawvisible: false,
            notes: prevState.notes,
            balance: prevState.balance,
            pastLimit: prevState.pastLimit,
            noNotes: prevState.noNotes
        }));
    }

    //Opens the withdraw form
    openWithdrawModal() {
        this.setState( prevState =>({
            signoutVisible : false,
            withdrawvisible: true,
            notes: prevState.notes,
            balance: prevState.balance,
            pastLimit: prevState.pastLimit,
            noNotes: prevState.noNotes
        }));
    }

    //Warning to tell user there are no notes left
    openNoNotesModal() {
        this.setState( prevState =>({
            signoutVisible : false,
            withdrawvisible: prevState.withdrawvisible,
            warningVisible: false,
            noNotesVisible: true,
            notes: prevState.notes,
            balance: prevState.balance,
            pastLimit: false,
            noNotes: prevState.noNotes
        }));
    }

    //Opens recent bank transactions
    openPrintStatement() {
        this.setState( prevState =>({
            signoutVisible : false,
            withdrawvisible: prevState.withdrawvisible,
            warningVisible: false,
            noNotesVisible: false,
            notes: prevState.notes,
            balance: prevState.balance,
            pastLimit: false,
            noNotes: prevState.noNotes,
            printStatementVisible: true,
        }));
    }

    //Withdraw function. Takes input from withdraw form and attempts to withdraw using the withdraw function in ./withdraw/withdraw.js
    //If successful, sets new balance/number of notes and any appropriate modals will appear.
    onWithdraw(event) {
        event.preventDefault();
        event.persist();
        this.withdrawState=withdraw(event.target[0].value,this.state); //Use withdraw value and state as input

        this.setState( prevState => ({
            signoutVisible: false,
            waiting: this.withdrawState.noNotes||this.withdrawState.pastLimit||this.withdrawState.notANote||this.withdrawState.wouldRunOut? false: true, //If no problems, show spinner to simulate transaction time
            noNotesVisible: this.withdrawState.noNotes? true: false, //Show modals based on varying criteria
            notANoteVisible: this.withdrawState.notANote? true: false,
            wouldRunOutVisible: this.withdrawState.wouldRunOut? true: false,
            withdrawvisible: this.withdrawState.noNotes||this.withdrawState.pastLimit||this.withdrawState.notANote||this.withdrawState.wouldRunOut? false: true,
            notes: this.withdrawState.notes, //New number of notes
            balance: prevState.balance, //Use old balance state for now, so that it doesn't change before "transaction" is complete
            pastLimit: this.withdrawState.pastLimit? true: false,
            noNotes: this.withdrawState.noNotes? true: false
        }));
        var newData= store.get("tableData");
        if(this.withdrawState.withdrawn >0){ //Add new data to PrintStatement modal if successful
            newData.unshift({
                Date: new Date().toDateString(),
                Description: "Withdrawal",
                Debits: "€" + this.withdrawState.withdrawn,
                Credits: "",
                Balance: "€" + this.withdrawState.balance
            })
            store.set("tableData", newData); //Table data placed in store to persist data
        }
    
        setTimeout(()=>{
            store.set("balance", this.state.balance);
            store.set("bankState", this.state);
            this.setState( prevState => ({
                signoutVisible: false,
                waiting: false,
                thanks: this.withdrawState.noNotes||this.withdrawState.pastLimit||this.withdrawState.notANote||this.withdrawState.wouldRunOut? false: true,
                noNotesVisible: this.withdrawState.noNotes? true: false,
                notANoteVisible: this.withdrawState.notANote? true: false,
                wouldRunOutVisible: this.withdrawState.wouldRunOut? true: false,
                withdrawvisible: false,
                notes: this.withdrawState.notes,
                balance: this.withdrawState.balance, //Set new balance after the timer is complete, i.e. 1 second
                pastLimit: this.withdrawState.pastLimit? true: false,
                noNotes: this.withdrawState.noNotes? true: false
            }))
        
        },1000) 
    }

    componentDidMount () {
        this.setState(prevState=>( 
            store.get("bankState")? //If there is a bank state present in store, use it for our state. Otherwise use default.
            {
                signoutVisible: false,
                notes:  store.get("bankState").notes? store.get("bankState").notes:{
                    fives: 4,
                    tens: 15,
                    twenties: 7,
                },
                balance: store.get("bankState").balance? store.get("bankState").balance: 220,
                pastLimit: store.get("bankState").pastLimit? store.get("bankState").pastLimit: false,
                noNotes: store.get("bankState").noNotes? store.get("bankState").noNotes: false
            }:
            {
                signoutVisible: false,
                notes:  {
                    fives: 4,
                    tens: 15,
                    twenties: 7,
                },
                balance: 220,
                pastLimit: prevState.pastLimit,
                noNotes: prevState.noNotes
            }
        ))
        if(store.get("tableData")== null) store.set("tableData",this.tableData); //Use table data in store, otherwise use data found in ./data.json
        setTimeout(()=>{
            store.set("bankState", this.state); //Give state time to assign before setting store
            
        },1000)
    }
        
    render(){
        if(!isLoggedIn()){ //If we're not logged in, go to login page
            return(
                <Router>
                    <Redirect to="/" />
                </Router>
            );
        }
            return(  //Otherwise render ATM
                <div className="backgroundATM">
                    <Container id="ATMUI">
                        <Container id="right-content-head">
                            <ATMNav name={store.get("name")} show={this.state.signoutVisible} onHide={this.closeModal} onClickLogout={this.openSignOutModal} onClickYes={this.signout} onClickNo={this.closeModal}/>
                        </Container>
                        <Container id="right-content-body">
                            <Container id="upperContent">
                                {this.state.balance!=null? <div>
                                    <h2 >Hello {store.get("name")}</h2>
                                    <h3 style={
                                        {color: this.state.balance< 0? "red": "green"}
                                    }>
                                        Your current balance is £{this.state.balance} with an overdraft of £100</h3>
                                    <h1>What can we help you with today?</h1>
                                </div>: null}
                                {this.state.noNotes? <h2 style={{color:"red"}}>We're sorry, but this machine has run out of notes. We apologise for the inconvenience.</h2>: null}
                            </Container>
                            <Container id="lowerContent">
                                <OverDrawnModal show={this.state.pastLimit} onHide={this.closeModal} state={this.state} />
                                <ButtonGroup classes={{root: "mainNavButtons", label: "mainNavButtons"}} className="mainNavButtons" variant="text" size="large" aria-label="large contained  button group">
                                    {
                                        this.state.noNotes?
                                        <Button disabled classes={{root: "menuButton", label: "menuButton"},"noNotes"} onClick={this.state.noNotes? this.openNoNotesModal: this.openWithdrawModal}>Withdraw</Button>:
                                        <Button classes={{root: "menuButton", label: "menuButton"}} className="menutButton" onClick={this.state.noNotes? this.openNoNotesModal: this.openWithdrawModal}    >Withdraw</Button>
                                    }
                                    <Button classes={{root: "menuButton", label: "menuButton"}} className="printStatement" onClick={this.openPrintStatement}>Print Statement</Button>
                                    <NoNotesModal show={this.state.noNotesVisible} onHide={this.closeModal} />
                                    <WithdrawModal waiting={this.state.waiting} state={this.state} value={this.value} show={this.state.withdrawvisible} onHide={()=>{this.closeModal()}} onSubmit={this.onWithdraw} />
                                    <NotANoteModal show={this.state.notANoteVisible} onHide={this.closeModal} />
                                    <PrintStatementModal data={store.get("tableData")} waiting={this.state.waiting} show={this.state.printStatementVisible} onHide={this.closeModal}/>
                                    <ThanksModal show={this.state.thanks} onClickClose={this.closeModal} onHide={this.closeModal} />
                                    <WouldRunOutModal show={this.state.wouldRunOutVisible} onHide={this.closeModal}/>
                                    <CannotReachTotalModal show={this.state.cannotProvideNotes} onHide={this.closeModal}/>
                                </ButtonGroup>
                            </Container>
                        </Container>
                    </Container>
                </div>
            )
        }
    }


export default Atm