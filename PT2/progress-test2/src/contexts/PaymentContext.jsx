import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';

const PaymentContext = createContext();

const initialState = {
    payments: [],
    filteredPayments: [],
    loading: false,
    error: null,
    filter: { search: '', semester: '', course: '' },
    sort: 'course_asc',
};

function paymentReducer(state, action) {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            const initialFiltered = filterAndSort(action.payload, state.filter, state.sort);
            return {
                ...state,
                loading: false,
                payments: action.payload,
                filteredPayments: initialFiltered
            };
        case 'FETCH_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload,
                filteredPayments: filterAndSort(state.payments, action.payload, state.sort)
            };
        case 'SET_SORT':
            return {
                ...state,
                sort: action.payload,
                filteredPayments: filterAndSort(state.payments, state.filter, action.payload)
            };
        case 'ADD_PAYMENT':
            const newPayments = [...state.payments, action.payload];
            return {
                ...state,
                payments: newPayments,
                filteredPayments: filterAndSort(newPayments, state.filter, state.sort)
            };
        case 'UPDATE_PAYMENT':
            const updatedPayments = state.payments.map(p =>
                p.id === action.payload.id ? action.payload : p
            );
            return {
                ...state,
                payments: updatedPayments,
                filteredPayments: filterAndSort(updatedPayments, state.filter, state.sort)
            };
        case 'DELETE_PAYMENT':
            const remainingPayments = state.payments.filter(p => p.id !== action.payload);
            return {
                ...state,
                payments: remainingPayments,
                filteredPayments: filterAndSort(remainingPayments, state.filter, state.sort)
            };
        default:
            return state;
    }
}

function filterAndSort(payments, filter, sort) {
    let result = [...payments];

    if (filter.search) {
        const s = filter.search.toLowerCase();
        result = result.filter(p =>
            (p.semester && p.semester.toLowerCase().includes(s)) ||
            (p.course && p.course.toLowerCase().includes(s))
        );
    }

    if (filter.semester) result = result.filter(p => p.semester === filter.semester);
    if (filter.course) result = result.filter(p => p.course === filter.course);

    switch (sort) {
        case 'course_asc':
            result.sort((a, b) => (a.course || '').localeCompare(b.course || ''));
            break;
        case 'course_desc':
            result.sort((a, b) => (b.course || '').localeCompare(a.course || ''));
            break;
        case 'date_asc':
            result.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'date_desc':
            result.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'amount_asc':
            result.sort((a, b) => Number(a.amount) - Number(b.amount));
            break;
        case 'amount_desc':
            result.sort((a, b) => Number(b.amount) - Number(a.amount));
            break;
        default:
            break;
    }

    return result;
}

export const PaymentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(paymentReducer, initialState);

    const fetchPayments = async () => {
        dispatch({ type: 'FETCH_START' });
        try {
            const data = await api.getPayments();
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
        } catch (err) {
            dispatch({ type: 'FETCH_FAILURE', payload: err.message });
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const addPayment = async (payment) => {
        try {
            const newPayment = await api.addPayment(payment);
            dispatch({ type: 'ADD_PAYMENT', payload: newPayment });
        } catch (err) {
            dispatch({ type: 'FETCH_FAILURE', payload: err.message });
        }
    };

    const updatePayment = async (payment) => {
        try {
            const updated = await api.updatePayment(payment);
            dispatch({ type: 'UPDATE_PAYMENT', payload: updated });
        } catch (err) {
            dispatch({ type: 'FETCH_FAILURE', payload: err.message });
        }
    };

    const deletePayment = async (id) => {
        try {
            await api.deletePayment(id);
            dispatch({ type: 'DELETE_PAYMENT', payload: id });
        } catch (err) {
            dispatch({ type: 'FETCH_FAILURE', payload: err.message });
        }
    };

    const setFilter = (filter) => dispatch({ type: 'SET_FILTER', payload: filter });
    const setSort = (sort) => dispatch({ type: 'SET_SORT', payload: sort });

    return (
        <PaymentContext.Provider
            value={{
                payments: state.payments,
                filteredPayments: state.filteredPayments,
                loading: state.loading,
                error: state.error,
                addPayment,
                updatePayment,
                deletePayment,
                setFilter,
                setSort,
                filter: state.filter,
                sort: state.sort,
            }}
        >
            {children}
        </PaymentContext.Provider>
    );
};

export const usePaymentContext = () => useContext(PaymentContext);
