import React , { Component } from 'react';
import axios from'axios';
import PropTypes from "prop-types";

export default class ForgotPassReset extends Component {
    constructor() {
        super();
        this.state = {
            password: "",
            confirm: "",
            token: "",
            success: ""
        };
        this.onSumbit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    componentDidMount(){
        axios.get(`${process.env.PORT}/api/users/reset/` + this.props.match.params.token)
        .then(res => {
            const {resetPasswordToken} = res.data;
            this.setState({token: resetPasswordToken})
        })
        .catch(function(err) {
            console.log(err)
        });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors) {
           this.setState({errors: nextProps.errors})
        } 
        else {
            this.setState({success: nextProps.emailsent})
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();
            const userData = {
                password: this.state.password,
                confirm: this.state.confirm,
                token: this.state.token
            }
            this.props.resetPasswordDb(userData);
            
        }

   render() {
       return (
           <div className="container">
           <div className="row">
           <div className="col-12 col-md-6 mt-4 mb-4">
           <h4 style={{textAlign: "center"}}>
                     <b>Enter New Password Below:</b>
            </h4>
            <p className="col-12 alert ">{this.state.errors} {this.state.success}</p> 

           <form className="col-12" noValidate onSubmit={this.onSubmit}>
           <div className="col-12 form-group mb-0">
           <input autoFocus
                        className="form-control col-12"
                        onChange={this.onChange}
                        value={this.state.password}
                        id="password"
                        name="password"
                        type="password"
                        />
                        
            <label htmlFor="email" className="col-8 col-form-label">New Password: </label>
           </div>
           <div className="col-12 form-group mb-0">
           <input 
                        className="form-control col-12"
                        onChange={this.onChange}
                        value={this.state.confirm}
                        id="confirm"
                        name="confirm"
                        type="password"
                        />
                        
            <label htmlFor="email" className="col-8 col-form-label">Confirm Password: </label>
           </div>
           <button className="btn btn-large btn-success" 
                    onSubmit={this.onSubmit} type="submit">
                    Reset Password
                    </button>
           </form>
           </div>
           </div>
           </div>
       )
   }

    }