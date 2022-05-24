import { useState } from 'react';
import { USER_FORMS } from '../constants/userForms';
import { useFilters } from '../lib/hooks/useFilters';
import { useUsers } from '../lib/hooks/useUsers';
import {
	filterActiveUsers,
	filterUsersByName,
	paginateUsers,
	sortUsers
} from '../lib/users/filterUsers';
import Button from './buttons/Button';
import UserCreateForm from './user-forms/UserCreateForm';
import UserDeleteForm from './user-forms/UserDeleteForm';
import UserEditForm from './user-forms/UserEditForm';
import UserFormLayout from './user-forms/UserFormLayout';
import style from './UsersList.module.css';
import UsersListFilters from './UsersListFilters';
import UsersListPagination from './UsersListPagination';
import UsersListRows from './UsersListRows';

const UsersList = () => {
	const {
		currentForm,
		currentUser,
		setFiltersForm,
		setCreateForm,
		setEditForm,
		setDeleteForm
	} = useForm();

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

	const onSuccess = () => {
		reloadUsers();
		resetFilters();
		setFiltersForm();
	};

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			{currentForm === USER_FORMS.FILTERS ? (
				<UsersListFilters
					{...filters}
					{...filtersSetters}
					slot={<Button onClick={setCreateForm}>Añadir usuario</Button>}
				/>
			) : (
				<UserFormLayout onClose={setFiltersForm}>
					{currentForm === USER_FORMS.CREATE && (
						<UserCreateForm onSuccess={onSuccess} />
					)}
					{currentForm === USER_FORMS.EDIT && (
						<UserEditForm onSuccess={onSuccess} user={currentUser} />
					)}
					{currentForm === USER_FORMS.DELETE && (
						<UserDeleteForm
							onSuccess={onSuccess}
							onCancel={setFiltersForm}
							user={currentUser}
						/>
					)}
				</UserFormLayout>
			)}
			<UsersListRows
				users={paginatedUsers}
				error={usersError}
				loading={usersLoading}
				setEditForm={setEditForm}
				setDeleteForm={setDeleteForm}
			/>
			<UsersListPagination
				{...pagination}
				{...paginationSetters}
				totalPages={totalPages}
			/>
		</div>
	);
};

const getUsersToDisplay = (
	users,
	{ search, onlyActive, sortBy },
	{ page, itemsPerPage }
) => {
	let usersFiltered = filterActiveUsers(users, onlyActive);
	usersFiltered = filterUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);

	const { paginatedUsers, totalPages } = paginateUsers(
		usersFiltered,
		page,
		itemsPerPage
	);

	return { paginatedUsers, totalPages };
};

const useForm = () => {
	const [currentForm, setCurrentForm] = useState({ form: USER_FORMS.FILTERS });

	const setFiltersForm = () => setCurrentForm({ form: USER_FORMS.FILTERS });
	const setCreateForm = () => setCurrentForm({ form: USER_FORMS.CREATE });
	const setEditForm = user => setCurrentForm({ form: USER_FORMS.EDIT, user });
	const setDeleteForm = user =>
		setCurrentForm({ form: USER_FORMS.DELETE, user });

	return {
		currentForm: currentForm.form,
		currentUser: currentForm.user,
		setFiltersForm,
		setCreateForm,
		setEditForm,
		setDeleteForm
	};
};

export default UsersList;
