import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


import Customers from './Customers'
import VisibleCustomers from '../src/Containers/CustomersCont';
import AddCustomer from './AddCustomer';

class Menu extends React.Component {
    render() {
        return (
            <Router>
            <div className="container col-12 mx-0">
            <div className="row">
                <nav className="navbar navbar-light col-12">
               
                <div className="collapse navbar-collapse">
                <ul className="mr-auto navbar-nav">
                <li className="nav-item">
                
                </li>
                <li className='nav-item'>
               
                </li>
                </ul>
                </div>
                </nav>
            </div>

           

            </div>
            </Router>
        )
    }
}

export default Menu;