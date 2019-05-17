import React from 'react';
var Channel = ["-Select-", "Retail Chain", "Hotel Chain", "Bakery"]

function InputField(props) {
    return (
        <div className="form-group">
            <label htmlFor="customer-name" className="col-form-label">{props.label}</label>
            <input type="text" className="form-control" name = {props.name} value = {props.value} onChange={props.handler} id={props.id} autoComplete = "off"/>
        </div>
    )
}

function InputFieldDate(props) {
    return (
        <div className="form-group">
            <label htmlFor="customer-name" className="col-form-label">{props.label}</label>
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



class AddCustomerForm extends React.Component {
    constructor(props) {
        super(props);
            this.state={
            customer_date:"",
            customer_customer:"",
            customer_channel:"",
            customer_description:"",
            customer_website:"",
            }
    this.handleChange=this.handleChange.bind(this)
    this.addCustomer = this.addCustomer.bind(this)
    this.reset = this.reset.bind(this) 
    }

    

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
        
    }

    addCustomer() {
        this.props.addCustomers(this.state)
        alert("Customer Added");
        this.props.fetchCustomers();
    }

    reset(){
        this.setState({
                customer_date:"",
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
                            <h2>Add A Customer</h2>
                            <form className="">
                                <InputFieldDate name="customer_date" id="customer-date" handler={this.handleChange} label="Date:" value={this.state.customer_date}/>
                                <InputField name="customer_customer" id="customer-name" handler={this.handleChange} label="Customer:" value={this.state.customer_customer}/>
                                <SelectAreaField options={Channel} name="customer_channel" handler={this.handleChange} 
                                 label="Channel:" value={this.state.customer_channel}/>
                                <TextAreaField name="customer_description" handler={this.handleChange} label="Description:" value={this.state.customer_description}/>
                                <InputField name="customer_website" id="customer-website" handler={this.handleChange} label="Website:" value={this.state.customer_website}/>
                            </form>
                        </div>
                        <div className="modal-footer">
                        <button type="submit" onClick={() => this.addCustomer()} className="btn btn-info" data-dismiss="modal">Add</button>
                        </div>
                    </div>
                    </div>

        )
    }
}


  

export default AddCustomerForm;