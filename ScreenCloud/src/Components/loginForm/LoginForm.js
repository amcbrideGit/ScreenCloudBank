import React from "react";
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
import store from 'store';
import "./LoginForm.css"
import isLoggedIn from "../loginForm/LoggedIn"

class LoginForm extends React.Component {
    constructor() {
        super()
        this.props != undefined? this.state = this.props.state: this.state= {
          pin: "",
          visible: false,
          name: ""
        }

        //Functions for changing state based on form input
        this.handlePinChange = this.handlePinChange.bind(this);
        this.handleNameChange= this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      
      //Changes state.pin based on values placed in PIN text input
      handlePinChange = event => {
        event.persist();
        this.setState( prevState=> ({
          pin: event.target.value,
          visible: prevState.visible,
          name: prevState.name
        }));
      };
      
      //Changes state.name based on values placed in name text input
      handleNameChange = event =>{
        event.persist();
        this.setState( prevState => ({
          pin: prevState.pin,
          visible: this.state.visible,
          name: event.target.value
        }));
      }

      handleSubmit(event) {
        event.preventDefault();
        fetch('https://frontend-challenge.screencloud-michael.now.sh/api/pin/', { //POST to this address
                method: 'POST',
                body: JSON.stringify({
                    "pin": this.state.pin //use entered pin
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => {
            if(response.status === 200){
              return response.json();//200 = use the response data
            }
            else {
              this.setState( prevState=> ({ //otherwise show incorrect pin 
                pin: "", 
                visible: true,
                name: ""
              }));
            }
            }).then(json => {
              if(json!= null){ //Set values in store for ATM to use
                store.set('loggedIn', true);
                store.set('balance', json.currentBalance);
                store.set('name', this.state.name);
              }
              return json;
        })
        .then((json)=>{
          this.props.history.push('/ATM'); //Finally redirect to ATM
        }).catch(err=>{
          console.error("ERROR: " + err)
        });
      }

      render() {
          if(isLoggedIn()){
            return( 
                      <Redirect to="/ATM" />//If we're logged in and we come to login form, redirect to atm
                    );
          }
          return( //Otherwise render Login form
            <div className="centered backgroundLogin">
              <form className="login-form" onSubmit={this.handleSubmit}>
                <div className="welcome">
                  <h1>Welcome to Screencloud Banking</h1>
                  {this.state.visible? <p style={{color:"red"}}> You have entered an incorrect PIN. Please try again.</p>: null}
                </div>
                <div className="form-entry-item">
                  <label htmlFor="nameInput">Name</label>
                  <input type="text" className="form-control" id="nameInput" aria-describedby="emailHelp" placeholder="Enter Name" onChange={this.handleNameChange}/>
                  <label htmlFor="pinInput">Pin</label>
                  <input type="password" className="form-control" id="pinInput" placeholder="Password" onChange={this.handlePinChange}/>
                </div>
                <button className="btn btn-primary submitButton">Submit</button>
              </form>
            </div>
          ) 
      }
}

export default LoginForm;