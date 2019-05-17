import { ADD_CUSTOMERS, SORT_CUSTOMERS, SEARCH_CUSTOMERS, DELETE_CUSTOMERS, EDIT_CUSTOMERS, FETCH_CUSTOMERS } from './types';
import axios from 'axios';
// Axios will make requests from here

const apiURL = `/customers`;

// Fetch Customers from Redux Store

export const fetchCustomers = (customers) => {
    return {
        type: FETCH_CUSTOMERS,
        customers: [...customers.data]
    }
}

export const fetchCustomersDb = () => {
    return function(dispatch) {
        return axios.get(`${apiURL}`)
           .then(response => {
               console.log(response.data)
            dispatch(fetchCustomers(response))
           }) 
           .catch (err => {
            throw (err);
        });
    };
};



// First we add info to database and then change Redux store
export const addCustomersDb = ({ id,
    customer_date, customer_customer, customer_channel, customer_description, 
    customer_operation, customer_status, customer_updates,
    customer_result, customer_total, customer_account, customer_priority, 
    customer_followup, customer_website
}) => {
return function(dispatch){
    return axios.post(`${apiURL}/add`, {customer_date, customer_customer, 
        customer_channel, customer_description, customer_operation, customer_status, 
        customer_updates,customer_result, customer_total, customer_account,
        customer_priority, customer_followup, customer_website })
    .then(response => {
        dispatch(addCustomers(response.data))
    })
    .catch(err => {
        throw (err);
    });
};
};



// Adding Customer to Redux store here

export const addCustomers = customer => {
    return {
        type: ADD_CUSTOMERS,
        payload: {
        _id: customer._id,
          customer_date: customer.customer_date,
          customer_customer: customer.customer_customer,
          customer_channel: customer.customer_channel,
          customer_description: customer.customer_description,
          customer_operation: customer.customer_operation,
          customer_status: customer.customer_status,
          customer_updates: customer.customer_updates,
          customer_result: customer.customer_result,
          customer_total: customer.customer_total,
          customer_account: customer.customer_account,
          customer_priority: customer.customer_priority,
          customer_followup: customer.customer_followup,
          customer_website: customer.customer_website
        } 
    };
}


// Deleting Customer from Redux store here

export const deleteCustomers = _id => {
    return {
        type: DELETE_CUSTOMERS,
        _id
    }
}

// Deleting ustomer from DB 

export const deleteCustomersDb = _id => {
    return (dispatch) => {
        return axios.post(`${apiURL}/delete/${_id}`)
        .then(response => {
            dispatch(deleteCustomers(response.data))
        })
        .catch(err => {
            throw (err);
        });
    };
};



// Get One Customer Profile


// Action After We Edit Customer 

export const editCustomers = customer => {
    return {
        type: EDIT_CUSTOMERS,
        customer
    }
}

// Edit Customer in DB

export const editCustomersDb = ({
    _id, customer_date, customer_customer, customer_channel, customer_description, 
    customer_operation, customer_status, customer_updates,
    customer_result, customer_total, customer_account, customer_priority, 
    customer_followup, customer_website
}) => {
return (dispatch) => {
    return axios.post(`${apiURL}/update/`+ _id, {
        customer_date, customer_customer, customer_channel, customer_description, 
        customer_operation, customer_status, customer_updates,
        customer_result, customer_total, customer_account, customer_priority, 
        customer_followup, customer_website
    })
    .then(response => {
        dispatch(editCustomers(response))
    })
    .catch(err => {
        throw (err);
    });
};
};

// Sort Customers in Redux

export const sortCustomers = sortType => {
    return {
        type: SORT_CUSTOMERS,
        sortType
    };
}

export const searchCustomers = searchType => {
    return {
        type: SEARCH_CUSTOMERS,
        searchType
    };
}