import React from 'react';
import axios from'axios';

var Channel = ["-Select-", "Retail Chain", "Hotel Chain", "Bakery"]

function InputField(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.id} className="col-form-label">{props.label}</label>
            <input type="text" className="form-control" name = {props.name} value = {props.value} onChange={props.handler} id={props.id} autoComplete = "off"/>
        </div>
    )
}

function InputFieldDate(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.id} className="col-form-label">{props.label}</label>
            <input type="date" className="form-control" name = {props.name} value = {props.value} onChange={props.handler} id={props.id} autoComplete = "off"/>
        </div>
    )
}

function TextAreaField(props) {
    return(
        <div className="form-group">
            <label htmlFor="description" className="col-form-label">{props.label}</label>
            <textarea className="form-control" name = {props.name} value = {props.value} id="description" onChange={props.handler} autoComplete = "off" type = "text"></textarea>
        </div>
    )
}

function SelectAreaField(props) {
    var optionsValue = props.options.map( (item, i) =>
        <option key={i} value={item}>{item}</option>
        )
    return(
        <div className="form-group">
            <label htmlFor="options" className="col-form-label">{props.label}</label><br/>
            <select name = {props.name} onChange={props.handler} 
            value={props.value} id="options">
            {optionsValue}
            </select>
        </div>
    )
}



class EditCustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            _id: "",
            customer_date:"",
            customer_customer:"",
            customer_channel:"",
            customer_description:"",
            customer_website:"",
            }
    this.handleChange=this.handleChange.bind(this)
    this.editCustomer = this.editCustomer.bind(this)
    this.reset = this.reset.bind(this) 
    }

    //Need to Add ComponentDidMount method and do DB connect there
    componentDidMount(){
        axios.get(`/customers/` + this.props.match.params.id)
        .then(res => {
            this.setState({
            _id: res.data._id,
            customer_date: res.data.customer_date, 
            customer_customer: res.data.customer_customer,
            customer_channel: res.data.customer_channel, 
            customer_description: res.data.customer_description,
            customer_website: res.data.customer_website
        })
    })
    .catch(function(err) {
        console.log(err)
    });
    }
    

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
        
    }

    //Need to change Redux action and create edit function so that Redux store changes

    editCustomer() {
        this.props.editCustomers(this.state);
        alert("Customer Information Successfully Updated");
        this.reset();
       
    }

    reset(){
        this.setState({
                _id: "",
                customer_date: Date.now(),
                customer_customer:"",
                customer_channel:"",
                customer_description:"",
                customer_website:"",
        });
    }

    render(){
        return (
            <div className="container my-3">
            <div className="row">
            <div className="col-12">
                           <h2>Edit Customer Information:</h2>
                            <form className="">
                                <InputFieldDate name="customer_date" id="customer-date" handler={this.handleChange} label="Action Date:" value={this.state.customer_date}/>
                                <InputField name="customer_customer" id="customer-name" handler={this.handleChange} label="Customer:" value={this.state.customer_customer}/>
                                <SelectAreaField options={Channel} name="customer_channel" handler={this.handleChange} 
                                 label="Channel:" value={this.state.customer_channel}/>
                                 <TextAreaField name="customer_description" handler={this.handleChange} label="Description:" value={this.state.customer_description}/>
                                <InputField name="customer_website" id="customer-website" handler={this.handleChange} label="Website:" value={this.state.customer_website}/>
                            </form>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" onClick={() => this.editCustomer()} className="btn btn-info" data-dismiss="modal">Complete</button>
                        </div>
                    </div>
                    </div>

        )
    }
}


  

export default EditCustomerForm;