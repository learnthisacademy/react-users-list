import IconButton from './buttons/IconButton';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import UserDisplay from './UserDisplay';
import UserRole from './UserRole';
import style from './UserRow.module.css';
import UserStatus from './UserStatus';

const UserRow = ({
	id,
	username,
	name,
	active,
	role,
	setEditForm,
	setDeleteForm
}) => {
	return (
		<div className={style.wrapper}>
			<div className={style.name}>
				<UserDisplay name={name} username={username} />
			</div>
			<div className={style.status}>
				<UserStatus active={active} />
			</div>
			<div className={style.role}>
				<UserRole role={role} />
			</div>
			<div className={style.action}>
				<IconButton
					icon={PencilIcon}
					onClick={() => setEditForm({ id, username, name, active, role })}
				/>
				<IconButton
					icon={TrashIcon}
					kind='red'
					onClick={() => setDeleteForm({ id, name })}
				/>
			</div>
		</div>
	);
};

export default UserRow;
