import React from 'react';
import { Container } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import { useUserContext } from '../contexts/UserContext'; 

const UserListPage = () => {
  const {
    filteredUsers,
    loading,
    error,
    filter,
    sort,
    setFilter,
    setSort,
    updateUserStatus // Hàm Ban/Unban
  } = useUserContext();

  return (
    <>
      {/* 2. Thanh điều hướng (NavBar) */}
      <NavigationHeader />

      <Container>
        {/* 3. Component Filter: Truyền state và hàm set state vào */}
        <UserFilter
          filter={filter}
          onFilterChange={setFilter}
          sort={sort}
          onSortChange={setSort}
        />

        {/* 4. Component Table: Truyền dữ liệu, trạng thái, và hàm "Ban" vào */}
        <UserTable
          users={filteredUsers}
          loading={loading}
          error={error}
          onUpdateStatus={updateUserStatus} // Truyền hàm Ban/Unban
        />
      </Container>
    </>
  );
};

export default UserListPage;
