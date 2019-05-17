import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch}  from 'react-router-dom';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./Actions/UserActions";
import store from './Store';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import VisibleCustomers from '../src/Containers/CustomersCont';
import Footer from './Components/Footer';
import AddCustomer from './Containers/AddCustomerCont';
import EditCustomer from './Containers/EditCustomerCont';
import Login from "./Components/Auth/Login";
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassEmailCont from './Containers/ForgotPassEmailCont';
import ForgotPassResetCont from './Containers/ForgotPassResetCont';


// Check for token to keep user logged in 
if(localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));


// Check for expired token
const currentTime = Date.now() / 1000;
if (decoded.exp < currentTime) {
  // Logout user
  store.dispatch(logoutUser());
  
  // Redirect to login
  window.location.href = "./login";
}
} 

class App extends Component {
  constructor(props) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this)
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    return (
    
      <Router>
        <div>
            <div className="container col-12 mx-0">
            <div className="row">
                <nav className="navbar navbar-expand-lg navbar-dark col-12">
                <h2 className="navbar-brand">Company X</h2>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
             
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                
                {this.props.auth.isAuthenticated === false ?
                <ul className="ml-auto navbar-nav">
              
                <li className="nav-item">
                <Link to="/login" className="nav-link active">Login</Link>
                </li>
                </ul>
                :
                ""
                }
                {this.props.auth.isAuthenticated === true ? 
                <ul className="ml-auto navbar-nav">
                 <li className="nav-item">
                <Link to="/customers" className="nav-link active">Customers</Link>
                </li> 
                <li className='nav-item'>
                <Link to="/create" className=" btn btn-info">Add Customer</Link>
                </li>
                <li><button className="btn ml-3" onClick={this.onLogoutClick}>Logout</button></li>
                </ul>
                :
                ""
                }
                
                </div>
                </nav>
            </div>
            
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            
        
            <Switch>
            <Route path="/api/users/reset/:token" exact component={ForgotPassResetCont} />
            <Route path="/forgot" exact component={ForgotPassEmailCont} />
            <Route path="/edit/:id" exact component={EditCustomer} />
            <PrivateRoute path="/customers" exact component={VisibleCustomers} />
            <Route path="/create" exact component={AddCustomer} />
            </Switch>
            </div>
            <Footer/>
            
            </div>
            
       </Router>
        
    )
  }
}
App.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(App);
