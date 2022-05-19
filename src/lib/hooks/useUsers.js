import { useEffect, useState } from 'react';
import { findAllUsers } from '../api/usersApi';

export const useUsers = () => {
	const [users, setUsers] = useState({
		data: [],
		error: false,
		loading: true
	});

	const setData = newData =>
		setUsers({ data: newData, loading: false, error: false });

	const setError = () => setUsers({ data: [], loading: false, error: true });

	const reloadUsers = () => setUsers({ data: [], loading: true, error: false });

	useEffect(() => {
		if (!users.loading) return;

		const controller = new AbortController();

		loadUsers(setData, setError, controller.signal);

		return () => controller.abort();
	}, [users.loading]);

	return {
		users: users.data,
		usersError: users.error,
		usersLoading: users.loading,
		reloadUsers
	};
};

const loadUsers = async (setData, setError, signal) => {
	const { users, aborted } = await findAllUsers(signal);

	if (aborted) return;
	if (users) setData(users);
	else setError();
};
