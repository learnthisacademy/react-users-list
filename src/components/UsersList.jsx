import UserRow from './UserRow';
import style from './UsersList.module.css';

const UsersList = ({ users, children }) => {
	const usersRendered =
		users.length > 0 ? (
			users.map(user => <UserRow key={user.name} {...user} />)
		) : (
			<p>No hay usuarios</p>
		);

	return (
		<div className={style.wrapper}>
			{children}
			{usersRendered}
		</div>
	);
};

export default UsersList;
