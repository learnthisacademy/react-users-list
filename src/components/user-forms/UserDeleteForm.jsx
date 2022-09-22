import { useContext, useState } from 'react';
import { deleteUserById } from '../../lib/api/usersApi';
import { UserFormsContext } from '../../lib/contexts/UserFormsContext';
import { alertBox } from '../../lib/events/alertEvents';
import Button from '../buttons/Button';
import style from './UserDeleteForm.module.css';

const UserDeleteForm = ({ currentUser, closeModal }) => {
	const { onSuccess } = useContext(UserFormsContext);

	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<form
			className={style.form}
			onSubmit={ev =>
				handleSubmit(ev, currentUser.id, setIsSubmitting, onSuccess, closeModal)
			}
		>
			<p>
				¿Estás seguro de que quieres eliminar al usuario {'"'}
				{currentUser.name}
				{'"'}?
			</p>
			<Button
				type='button'
				kind='secondary'
				disabled={isSubmitting}
				onClick={closeModal}
			>
				{isSubmitting ? 'Cargando...' : 'Cancelar'}
			</Button>
			<Button type='submit' disabled={isSubmitting}>
				{isSubmitting ? 'Cargando...' : 'Eliminar usuario'}
			</Button>
		</form>
	);
};

const handleSubmit = async (
	ev,
	userId,
	setIsSubmitting,
	onSuccess,
	closeModal
) => {
	ev.preventDefault();

	setIsSubmitting(true);

	const success = await deleteUserById(userId);

	if (success) {
		onSuccess();
		alertBox.success('Usuario eliminado con éxito');
	} else {
		alertBox.error('Error al eliminar al usuario');
	}
	closeModal();
};

export default UserDeleteForm;
