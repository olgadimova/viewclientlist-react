import { connect } from 'react-redux';
import Customers from '../Components/Customers';
import {sortCustomers, searchCustomers, deleteCustomersDb, fetchCustomersDb} from '../Actions/CustomerActions';


const mapDispatchToProps = dispatch => {
  return {
    sortCustomer: sortType => dispatch(sortCustomers(sortType)),
    searchCustomer: searchType => dispatch(searchCustomers(searchType)),
    deleteCustomers: _id => dispatch(deleteCustomersDb(_id)),
    fetchCustomers: (customers) => dispatch(fetchCustomersDb(customers)),
  };
};

function mapStateToProps(state) {
  const {user} = state.auth;
  const {customers} = state.customers;
     return { customers: customers,
              user: user
    };
  };

const VisibleCustomers = connect(mapStateToProps,mapDispatchToProps)(Customers);
export default VisibleCustomers;