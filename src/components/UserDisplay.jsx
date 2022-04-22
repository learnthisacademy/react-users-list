import style from './UserDisplay.module.css';

const UserDisplay = ({ name, username }) => (
	<div className={style.wrapper}>
		<span>{name}</span>
		<span className={style.username}>@{username}</span>
	</div>
);

export default UserDisplay;
