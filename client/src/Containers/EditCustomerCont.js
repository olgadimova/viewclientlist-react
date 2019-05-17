import { connect } from 'react-redux';
import EditCustomerForm from '../Components/EditCustomer';
import { editCustomersDb} from '../Actions/CustomerActions';

const mapDispatchToProps = dispatch => {
    return {
      editCustomers: customer => dispatch(editCustomersDb(customer)),
    };
 };

function mapStateToProps(state) {
  const {customers}  = state.customers;
   return { customers: customers };
};

const EditCustomer = connect(mapStateToProps, mapDispatchToProps)(EditCustomerForm);
export default EditCustomer;