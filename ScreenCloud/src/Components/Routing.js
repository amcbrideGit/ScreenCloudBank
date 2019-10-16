import React from "react"
import LoginForm from "./loginForm/LoginForm"
import Atm from './atm/Atm';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import isLoggedIn from "./loginForm/LoggedIn"
import ATMNav from "./navbar/ATMNav";


export default function Routing( ){
    return(
        <div>
            <Route path='/login' component={LoginForm} />
            <Route path='/ATM' component={Atm} />
            <Route path='/' component={!isLoggedIn()? LoginForm: Atm} />
        </div>
    )
}