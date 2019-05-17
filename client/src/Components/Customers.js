import React,  { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from'axios';

import {CSVLink} from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';



function TableHead(props) {
    return (
        <th scope="col" style={{visibility: props.visibility}} className="mb-auto"><p className="mb-0">{props.label}</p></th>
    )
}

function TableData(props) {
  return (
    <td>{props.text}</td>
  )
}


function DeleteButton(props) {
  return (
    <td><button className="btn btn-danger" onClick={() => props.delete(props._id)}>X</button></td>
  )
}

function EditButton(props) {
  return (
    
    <td><button className="btn btn-info"><Link to={"/edit/" + props._id}  style={{color: "white"}}>Edit</Link></button></td>
   
    
    
  )
}
function NoDataRow(props) {
  return(
    <tr>
    <td colSpan="14">No Customers found.</td>
    </tr>
  )
}
function TableDataRow(props) {
  return (
     <tr>
       <DeleteButton delete={props.delete} _id={props._id}/>
       <EditButton _id={props._id}/>
       <TableData text={props.date}/>
       <TableData text={props.customer}/>
       <TableData text={props.channel}/>
       <TableData text={props.description}/>
       <TableData text={props.website}/>
     </tr>
  )
}

function SortAreaField(props) {
  var optionsValue = props.options.map( (item, i) =>
      <option key={i} value={item}>{item}</option>
      )
  return(
      <div className="form-group">
          <label htmlFor="options" className="col-form-label mr-2">Sort By:</label><br/>
          <select name = {props.name} onChange={props.handler} 
          value={props.value} id="options">
          {optionsValue}
          </select>
      </div>
  )
}

function searchFor(search) {
  return function(x){
    return x.customer_customer.includes(search) ||
    
   !search;
  }
}

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:"",
      sort: "",
    }
    this.updateSearch = this.updateSearch.bind(this)
    this.updateSort = this.updateSort.bind(this)
    this.deleteCustomer = this.deleteCustomer.bind(this) 
  }

  componentDidMount(){
    this.props.fetchCustomers();
  }

  updateSearch(event) {
   this.setState({[event.target.name]: event.target.value});
  
  } 
  updateSort(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
 
  }

  deleteCustomer(_id){
    this.props.deleteCustomers(_id);
    alert("Customer deleted");
    this.props.fetchCustomers();
  }

render() {
  
  // Data for Excel File Export
  const csvData = this.props.customers;
const headers = [
  {label: 'Date', key: 'date'},
  {label: 'Customer', key: 'customer'},
  {label: 'Channel', key: 'channel'},
  {label: 'Description', key: 'description'},
  {label: 'Website', key: 'website'},
];
  
  // Sort Values
  const sortValue = ["-Select-", "Date", "Customer"];
    if(this.props.customers.length === 0) {
      return (
        <div className="container px-0 mt-3" style={{height: "calc(100vh - 90px)"}}>
          <div className="row px-0 mx-0">
          
              <form className="form-inline ml-2 mb-3 mx-auto">
                  <input name="search" value={this.state.search} onChange = {this.updateSearch}  className="form-control mr-sm-2" 
                  type="search" placeholder="Search" aria-label="Search"/>
                  
                  <SortAreaField name="sort" value={this.state.sort} options={sortValue} handler={this.updateSort}/>
                  <button type="button" className="btn btn-info ml-2" onClick={() => this.props.sortCustomer(this.state.sort.toLowerCase())}>Sort</button>
              
              </form>
          </div>

          <div className="row px-0 mx-0">
            <div className="table-responsive" style={{height:"calc(100vh - 150px)"}}>
            <table className="table table-hover table-bordered" ref="data">
              <thead>
                <tr>
                  
                  <TableHead label="Delete"/>
                  <TableHead label="Edit"/>
                  <TableHead label="Date"/>
                  <TableHead label="Customer"/>
                  <TableHead label="Channel"/>
                  <TableHead label="Description"/>
                  <TableHead label="Website"/>
                </tr>
              </thead>
              <tbody>
              
              <NoDataRow />
 
              </tbody>
            </table>
            </div>
            </div>
            </div>
      )
    } else {
    return (
        <div className="container px-0 mt-3 mb-auto">
          <div className="row px-0 mx-0">
          
              <form className="form-inline ml-2 mb-3 mx-auto">
                  <input name="search" value={this.state.search} onChange = {this.updateSearch}  className="form-control mr-sm-2" 
                  type="search" placeholder="Search" aria-label="Search"/>
                  
                  <SortAreaField name="sort" value={this.state.sort} options={sortValue} handler={this.updateSort}/>
                  <button type="button" className="btn btn-info ml-2" onClick={() => this.props.sortCustomer(this.state.sort.toLowerCase())}>Sort</button>
              
              </form>
              <div className="row px-0 mx-0 my-3" style={{textAlign: "center"}}>
           <div className="col-12">
            <CSVLink data={csvData} headers={headers} 
            filename={"file.csv"}
            className="btn btn-info  download mx-3"
            target="_blank" separator={";"}>Download Excel</CSVLink>
            </div>
        </div>
          </div>

          <div className="row px-0 mx-0">
            <div className="table-responsive" style={{height:"calc(100vh - 90px)"}}> 
            <table className="table table-hover table-bordered" ref="data">
              <thead>
                <tr>
                  
                  <TableHead label="Delete"/>
                  <TableHead label="Edit"/>
                  <TableHead label="Date"/>
                  <TableHead label="Customer"/>
                  <TableHead label="Channel"/>
                  <TableHead label="Description"/>
                  <TableHead label="Website"/>
                </tr>
              </thead>
              <tbody>
              
            {this.props.customers.filter(searchFor(this.state.search)).map( (customer,i) => {
              return (
            <TableDataRow key={i} 
            _id={customer._id}
            date={customer.customer_date}
            customer={customer.customer_customer}
            channel={customer.customer_channel}
            description={customer.customer_description}
            website={customer.customer_website}
            delete={this.deleteCustomer}
             
            />
              )}
            )}
 
              </tbody>
            </table>
            </div>
            </div>
      </div>
    )}
}
}


export default Customers;