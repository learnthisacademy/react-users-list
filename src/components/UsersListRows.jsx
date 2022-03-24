import UserRow from './UserRow';

const UsersListRows = ({ users }) => {
	if (!users.length) return <p>No hay usuarios</p>;

	return users.map(user => <UserRow key={user.id} {...user} />);
};

export default UsersListRows;
