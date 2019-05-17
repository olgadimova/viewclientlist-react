import { connect } from 'react-redux';
import AddCustomerForm from '../Components/AddCustomer';
import { addCustomersDb,fetchCustomersDb } from '../Actions/CustomerActions';

const mapDispatchToProps = dispatch => {
    return {
      addCustomers: customer => dispatch(addCustomersDb(customer)),
      fetchCustomers: (customers) => dispatch(fetchCustomersDb(customers))
    };
 };

 function mapStateToProps(state) {
  const {user} = state.auth;
     return {user: user};
  };

const AddCustomer = connect(mapStateToProps, mapDispatchToProps)(AddCustomerForm);
export default AddCustomer;
