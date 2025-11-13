import React, { useEffect, useState, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import { fetchUsers, updateUser } from '../features/users/usersSlice';

const UserListPage = () => {
  const dispatch = useDispatch();
  const { list: users, loading, error } = useSelector((state) => state.users);

  const [filter, setFilter] = useState({ search: '', role: '', status: '' });
  const [sort, setSort] = useState('username_asc');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUpdateStatus = (user, newStatus) => {
    dispatch(updateUser({ ...user, status: newStatus }));
  };

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    let result = [...users];

    if (filter.search) {
      const s = filter.search.toLowerCase();
      result = result.filter(u => 
        (u.username && u.username.toLowerCase().includes(s)) ||
        (u.fullName && u.fullName.toLowerCase().includes(s))
      );
    }
    if (filter.role) result = result.filter(u => u.role === filter.role);
    if (filter.status) result = result.filter(u => u.status === filter.status);

    // Sắp xếp đơn giản (mở rộng thêm case nếu cần)
    if (sort === 'username_asc') result.sort((a, b) => (a.username || '').localeCompare(b.username || ''));
    if (sort === 'username_desc') result.sort((a, b) => (b.username || '').localeCompare(a.username || ''));
    
    return result;
  }, [users, filter, sort]);

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
        <h2>User Management</h2>
        <UserFilter 
          filter={filter} 
          onFilterChange={setFilter} 
          sort={sort} 
          onSortChange={setSort} 
        />
        <UserTable 
          users={filteredUsers} 
          loading={loading} 
          error={error} 
          onUpdateStatus={handleUpdateStatus} 
        />
      </Container>
    </>
  );
};

export default UserListPage;
