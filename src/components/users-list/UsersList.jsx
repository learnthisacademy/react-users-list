import { useState } from 'react';
import { useFilters } from '../../lib/hooks/useFilters';
import { useUsers } from '../../lib/hooks/useUsers';
import { getUsersToDisplay } from '../../lib/users/filterUsers';
import UserFormsProvider from '../providers/UserFormsProvider';
import UserFormContainer from '../user-forms/UserFormContainer';
import style from './UsersList.module.css';
import UsersListFilters from './UsersListFilters';
import UsersListPagination from './UsersListPagination';
import UsersListRows from './UsersListRows';
import UsersListViewSelector from './UsersListViewSelector';

const UsersList = () => {
	const [view, setView] = useState(true);

	const {
		filters,
		pagination,
		filtersSetters,
		paginationSetters,
		resetFilters
	} = useFilters();

	const { users, usersError, usersLoading, reloadUsers } = useUsers();

	const { paginatedUsers, totalPages } = getUsersToDisplay(
		users,
		filters,
		pagination
	);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UserFormsProvider resetFilters={resetFilters} reloadUsers={reloadUsers}>
				<UsersListFilters {...filters} {...filtersSetters} />
				<UsersListViewSelector view={view} setView={setView} />
				<UserFormContainer />
				<UsersListRows
					users={paginatedUsers}
					error={usersError}
					loading={usersLoading}
					view={view}
				/>
			</UserFormsProvider>
			<UsersListPagination
				{...pagination}
				{...paginationSetters}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default UsersList;
