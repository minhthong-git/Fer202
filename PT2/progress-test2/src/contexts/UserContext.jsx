import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api'; // Import API

const UserContext = createContext();
const initialState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
  filter: { search: '', role: '', status: '' },
  sort: 'username_asc', 
};

function userReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };

    case 'FETCH_SUCCESS': {
      const initialFiltered = filterAndSort(action.payload, state.filter, state.sort);
      return {
        ...state,
        loading: false,
        users: action.payload,
        filteredUsers: initialFiltered,
      };
    }

    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
        filteredUsers: filterAndSort(state.users, action.payload, state.sort),
      };

    case 'SET_SORT':
      return {
        ...state,
        sort: action.payload,
        filteredUsers: filterAndSort(state.users, state.filter, action.payload),
      };

    case 'UPDATE_USER_SUCCESS': {
      const updatedUsers = state.users.map((u) =>
        u.id === action.payload.id ? action.payload : u
      );
      return {
        ...state,
        users: updatedUsers,
        filteredUsers: filterAndSort(updatedUsers, state.filter, state.sort),
      };
    }

    default:
      return state;
  }
}

function filterAndSort(users, filter, sort) {
  let result = [...users];

  // --- Lọc (Filter) ---
  if (filter.search) {
    const s = filter.search.toLowerCase();
    result = result.filter(
      (u) =>
        (u.username && u.username.toLowerCase().includes(s)) ||
        (u.fullName && u.fullName.toLowerCase().includes(s))
    );
  }
  if (filter.role) result = result.filter((u) => u.role === filter.role);
  if (filter.status) result = result.filter((u) => u.status === filter.status);

  // --- Sắp xếp (Sort) ---
  switch (sort) {
    case 'username_asc':
      result.sort((a, b) => (a.username || '').localeCompare(b.username || ''));
      break;
    case 'username_desc':
      result.sort((a, b) => (b.username || '').localeCompare(a.username || ''));
      break;
    case 'fullName_asc':
      result.sort((a, b) => (a.fullName || '').localeCompare(b.fullName || ''));
      break;
    case 'fullName_desc':
      result.sort((a, b) => (b.fullName || '').localeCompare(a.fullName || ''));
      break;
    case 'role_asc':
      result.sort((a, b) => (a.role || '').localeCompare(b.role || ''));
      break;
    case 'role_desc':
      result.sort((a, b) => (b.role || '').localeCompare(a.role || ''));
      break;
    default:
      break;
  }

  return result;
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Gọi API khi component mount
  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const data = await api.getUsers();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILURE', payload: err.message });
      }
    };
    fetchUsers();
  }, []);


  // Cập nhật trạng thái user (Ban / Unban)
  const updateUserStatus = async (user, newStatus) => {
    try {
      const updatedUserData = { ...user, status: newStatus };
      const updatedUser = await api.updateUser(user.id, updatedUserData);
      dispatch({ type: 'UPDATE_USER_SUCCESS', payload: updatedUser });
    } catch (err) {
      dispatch({ type: 'FETCH_FAILURE', payload: err.message });
    }
  };

  // Thiết lập bộ lọc
  const setFilter = (filter) => dispatch({ type: 'SET_FILTER', payload: filter });

  // Thiết lập sắp xếp
  const setSort = (sort) => dispatch({ type: 'SET_SORT', payload: sort });

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        filteredUsers: state.filteredUsers,
        loading: state.loading,
        error: state.error,
        filter: state.filter,
        sort: state.sort,
        setFilter,
        setSort,
        updateUserStatus, 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
