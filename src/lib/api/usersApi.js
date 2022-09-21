import { SORT_OPTIONS } from '../../constants/sortOptions';

export const createUser = async user => {
	try {
		const res = await fetch('http://localhost:4000/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});

		return res.ok;
	} catch {
		return false;
	}
};

export const updateUser = async user => {
	try {
		const res = await fetch(`http://localhost:4000/users/${user.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});

		return res.ok;
	} catch {
		return false;
	}
};

export const updateUserPic = async (userId, picture) => {
	try {
		const res = await fetch(`http://localhost:4000/users/${userId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ picture })
		});

		return res.ok;
	} catch {
		return false;
	}
};

export const deleteUserById = async userId => {
	try {
		const res = await fetch(`http://localhost:4000/users/${userId}`, {
			method: 'DELETE'
		});

		return res.ok;
	} catch {
		return false;
	}
};

const SORT_MAPPER = {
	[SORT_OPTIONS.NAME]: ['name', 'asc'],
	[SORT_OPTIONS.ROLE]: ['role', 'desc'],
	[SORT_OPTIONS.ACTIVE]: ['active', 'desc']
};

const getFindAllUrl = ({ page, itemsPerPage, search, onlyActive, sortBy }) => {
	const url = new URL('http://localhost:4000/users');
	url.searchParams.append('_page', page);
	url.searchParams.append('_limit', itemsPerPage);

	if (search) url.searchParams.append('name_like', search);
	if (onlyActive) url.searchParams.append('active', true);

	const sortProps = SORT_MAPPER[sortBy];
	if (sortProps) {
		const [sort, order] = sortProps;
		url.searchParams.append('_sort', sort);
		url.searchParams.append('_order', order);
	}

	return url.href;
};

export const findAllUsers = async (signal, filters) => {
	const url = getFindAllUrl(filters);

	try {
		const res = await fetch(url, { signal });

		let users;

		if (res.ok) users = await res.json();

		return {
			users,
			count: res.ok ? res.headers.get('x-total-count') : 0,
			error: !res.ok,
			aborted: false
		};
	} catch (err) {
		const isAborted = err.name === 'AbortError';

		return {
			users: undefined,
			count: 0,
			error: !isAborted,
			aborted: isAborted
		};
	}
};

export const findUserByUsername = async (username, signal) => {
	try {
		const res = await fetch(
			`http://localhost:4000/users?username=${username}`,
			{ signal }
		);

		let user;

		if (res.ok) {
			const users = await res.json();
			user = users[0];
		}

		return {
			user,
			error: !res.ok,
			aborted: false
		};
	} catch (err) {
		const isAborted = err.name === 'AbortError';

		return {
			user: undefined,
			error: !isAborted,
			aborted: isAborted
		};
	}
};
