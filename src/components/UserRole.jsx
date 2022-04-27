import { USER_ROLES } from '../constants/userRoles';
import style from './UserRole.module.css';

const ROLE_STYLES = {
	[USER_ROLES.TEACHER]: ['Profesor', style.teacher],
	[USER_ROLES.STUDENT]: ['Alumno', style.student],
	[USER_ROLES.OTHER]: ['Otro', style.other]
};

const UserRole = ({ role }) => {
	const [roleName, roleClassname] = ROLE_STYLES[role] || ROLE_STYLES.other;

	return <span className={`${style.role} ${roleClassname}`}>{roleName}</span>;
};

export default UserRole;
