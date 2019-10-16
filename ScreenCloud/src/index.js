import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import Routing from "./Components/Routing"
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from "./App"
import LoginForm from './Components/loginForm/LoginForm';
import Atm from './Components/atm/Atm';
import isLoggedIn from "./Components/loginForm/LoggedIn";

const routing = (
    <Router>
      <div>
        <Switch>
            <Route path='/login' component={LoginForm} />
            <Route path='/ATM' component={Atm} />
            <Route path='/' component={!isLoggedIn()? LoginForm: Atm} />
        </Switch>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
