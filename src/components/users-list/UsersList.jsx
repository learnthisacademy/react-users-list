import { useReducer, useState } from 'react';
import { reset } from '../../lib/actions/filtersActions';
import { UserFormsContext } from '../../lib/contexts/UserFormsContext';
import { useUsers } from '../../lib/hooks/useUsers';
import {
	filtersReducer,
	FILTERS_INITIAL_STATE
} from '../../lib/reducers/filtersReducer';
import AlertBox from '../alerts/AlertBox';
import style from './UsersList.module.css';
import UsersListFilters from './UsersListFilters';
import UsersListPagination from './UsersListPagination';
import UsersListRows from './UsersListRows';
import UsersListViewSelector from './UsersListViewSelector';

const UsersList = () => {
	const [showRowsFormat, setShowRowsFormat] = useState(true);

	const [filters, dispatchFilters] = useReducer(
		filtersReducer,
		FILTERS_INITIAL_STATE
	);

	const { users, totalUsers, usersError, usersLoading } = useUsers(filters);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<AlertBox />
			<UserFormsContext.Provider
				value={{ onSuccess: () => dispatchFilters(reset()) }}
			>
				<UsersListFilters
					search={filters.search}
					onlyActive={filters.onlyActive}
					sortBy={filters.sortBy}
					dispatchFilters={dispatchFilters}
				/>
				<UsersListViewSelector
					showRowsFormat={showRowsFormat}
					setShowRowsFormat={setShowRowsFormat}
				/>
				<UsersListRows
					users={users}
					error={usersError}
					loading={usersLoading}
					view={showRowsFormat}
				/>
			</UserFormsContext.Provider>
			<UsersListPagination
				page={filters.page}
				itemsPerPage={filters.itemsPerPage}
				totalUsers={totalUsers}
				dispatchFilters={dispatchFilters}
			/>
		</div>
	);
};

export default UsersList;
