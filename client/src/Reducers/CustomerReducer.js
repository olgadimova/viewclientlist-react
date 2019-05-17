import { ADD_CUSTOMERS, SORT_CUSTOMERS, DELETE_CUSTOMERS, EDIT_CUSTOMERS, FETCH_CUSTOMERS } from '../Actions/types';

const initialState = {
    customers: [],
};

const CustomerReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CUSTOMERS:
        return {...state, 
            customers: action.customers

        };
        case ADD_CUSTOMERS:
        return {
            ...state,
        customers: [...state.customers, action.payload]
        };
        case SORT_CUSTOMERS:
        return {
            ...state,
        customers: [...state.customers.sort( (a,b) => {
            if(action.sortType === "customer") {
                return a.customer_customer < b.customer_customer ? -1 : 1;
            } else if (action.sortType === "action date") {
                return new Date(b.customer_date).getTime() - new Date(a.customer_date).getTime();
            } else if (action.sortType === "updates") {
            return new Date(a.customer_updates).getTime() - new Date(b.customer_updates).getTime();
            }
        })]
        };
        case DELETE_CUSTOMERS:
        return {
            ...state,
        customers: [...state.customers.filter(customers => {
            return state.customers._id !== action._id}
        )]
        };

        case EDIT_CUSTOMERS:
        return {
            ...state,
            customers: [...state.customers.map(item => 
                item._id === action.customer._id ? 
                {...item, 
                    customer_customer: action.customer.customer_customer,
                    customer_date: action.customer.customer_date, 
                    customer_channel: action.customer.customer_channel, 
                    customer_description: action.customer.customer_description, 
                    customer_operation: action.customer.customer_operation, 
                    customer_status: action.customer.customer_status, 
                    customer_updates: action.customer.customer_updates, 
                    customer_result: action.customer.customer_result,
                    customer_total: action.customer.customer_total, 
                    customer_account:action.customer.customer_account, 
                    customer_priority: action.customer.customer_priority, 
                    customer_followup: action.customer.customer_followup, 
                    customer_website: action.customer.customer_website
                } : item)
            ]
        };
        
        default:
        return state;
    }
}

export default CustomerReducer;