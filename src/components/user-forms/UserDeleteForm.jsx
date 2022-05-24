import { useState } from 'react';
import { deleteUserById } from '../../lib/api/usersApi';
import Button from '../buttons/Button';
import style from './UserDeleteForm.module.css';

const UserDeleteForm = ({ onSuccess, onCancel, user }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<form
			onSubmit={ev => handleSubmit(ev, user.id, setIsSubmitting, onSuccess)}
		>
			<p className={style.text}>
				¿Estás seguro de que quieres eliminar al usuario {'"'}
				{user.name}
				{'"'}?
			</p>
			<div className={style.row}>
				<Button
					type='button'
					kind='secondary'
					disabled={isSubmitting}
					onClick={onCancel}
				>
					{isSubmitting ? 'Cargando...' : 'Cancelar'}
				</Button>
				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Cargando...' : 'Eliminar usuario'}
				</Button>
			</div>
		</form>
	);
};

const handleSubmit = async (ev, userId, setIsSubmitting, onSuccess) => {
	ev.preventDefault();

	setIsSubmitting(true);

	const success = await deleteUserById(userId);

	if (success) {
		onSuccess();
	} else {
		setIsSubmitting(false);
	}
};

export default UserDeleteForm;
