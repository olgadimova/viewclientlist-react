import React , { Component } from 'react';

import PropTypes from "prop-types";

export default class ForgotPassEmail extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            errors: "",
            success: ""
        };
        this.onSumbit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors) {
           this.setState({errors: nextProps.errors})
        } else {
            this.setState({success: nextProps.emailsent})
        }
    }
    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email
        }
        this.props.sendResetEmail(userData);
    }

   render() {
       return (
           <div className="container mt-4 mb-4">
           <div className="row" style={{height:"calc(100vh - 160px)"}}>
           <div className="col-12">
           <h5 className="pl-2" style={{textAlign: "left"}}>
                     <b>Forgot Password? Write Your Email Here:</b>
            </h5>
           <form className="col-12 col-md-6"  onSubmit={this.onSubmit}>
           <p className="col-12 alert">{this.state.errors} </p> 
           <p className="col-12 alert">{this.state.success}</p> 
           <div className="col-12 form-group mb-0 pl-0">
           <input 
                        className="form-control col-12"
                        onChange={this.onChange}
                        value={this.state.email}
                        id="email"
                        name="email"
                        type="email"
                        />
                        
            <label htmlFor="email" className="col-12 col-form-label">Email*</label>
           </div>
           <button className="btn btn-large btn-primary" 
                    onSubmit={this.onSubmit} type="submit">
                    Send Email
                    </button>
           </form>
           </div>
           </div>
           </div>
       )
   }

}
