import style from './UserRole.module.css';

const ROLE_STYLES = {
	teacher: ['Profesor', style.teacher],
	student: ['Alumno', style.student],
	other: ['Otro', style.other]
};

const UserRole = ({ role }) => {
	const [roleName, roleClassname] = ROLE_STYLES[role] || ROLE_STYLES.other;

	return <span className={`${style.role} ${roleClassname}`}>{roleName}</span>;
};

export default UserRole;
