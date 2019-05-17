import React , { Component } from 'react';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from '../../Actions/UserActions';


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
        };
        this.onSumbit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }

    componentDidMount() {
        // redirect loged in user to customers page
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/customers");
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push("/customers");
            
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
        
    }

    render() {
        return(
         <div className="container h-100" >
            <div className="row py-4" style={{height:"calc(100vh - 105px)", alignItems: "center", justifyContent: "center" }}>
                <div className="col-span-4 col-12 col-md-4 px-2 py-2" style={{border: "1px solid #ddd", backgroundColor: "#f8f8f8", borderRadius: "5px"}}>
                    
                <div className="col-12" style={{paddingLeft: "11px"}}>
                 <h4 style={{textAlign: "center"}}>
                     <b>Login Here</b>
                 </h4>
                
                </div>
                
                <div className="row">
                <form className="col-12" noValidate onSubmit={this.onSubmit}>
                    <div className="col-12 form-group mb-0">
                    { this.props.errors.email === undefined & this.props.errors.password === undefined 
                    & this.props.errors.emailnotfound === undefined & this.props.errors.passwordincorrect === undefined
                    ? 
                    <br/> :
                    <p className="col-12 alert alert-warning border-0">{this.props.errors.email} {this.props.errors.emailnotfound}</p>
                    }
                   
                        <input 
                        className="form-control col-12"
                        onChange={this.onChange}
                        value={this.state.email}
                        required
                        id="email"
                        name="email"
                        type="email"
                        />
                        
                        <label htmlFor="email" className="col-8 col-form-label">Email*</label>
                        
                    </div>
                    <div className="col-12 form-group">
                    { this.props.errors.email === undefined & this.props.errors.password === undefined 
                    & this.props.errors.emailnotfound === undefined & this.props.errors.passwordincorrect === undefined ?
                    <br/> :
                    <p className="col-12 alert ">{this.props.errors.password} {this.props.errors.passwordincorrect}</p>
                    }
                    <input 
                        className="form-control col-12"
                        onChange={this.onChange}
                        value={this.state.password}
                        id="password"
                        name="password"
                        type="password"
                        required
                        />
                        <label htmlFor="password" className="col-form-label col-12">Password*</label>
                         
                    </div>
                    
                    <div className="col-12" style={{paddingLeft: "11px", textAlign:"center"}}>
                    <button className="btn btn-large btn-primary" 
                    onSubmit={this.onSubmit} type="submit">
                    Login
                    </button>
                    </div>
                </form>
                </div>
                </div>
             </div>
         </div>
        )
    }
    
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);