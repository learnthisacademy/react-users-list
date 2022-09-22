import { useContext, useState } from 'react';
import { USER_ROLES } from '../../constants/userRoles';
import {
	nameChanged,
	usernameChanged
} from '../../lib/actions/createFormActions';
import { createUser } from '../../lib/api/UsersApi';
import { UserFormsContext } from '../../lib/contexts/UserFormsContext';
import { alertBox } from '../../lib/events/alertEvents';
import { useCreateForm } from '../../lib/hooks/useCreateForm';
import Button from '../buttons/Button';
import InputCheckbox from '../forms/InputCheckbox';
import InputText from '../forms/InputText';
import InputTextAsync from '../forms/InputTextAsync';
import Select from '../forms/Select';
import style from './UserCreateForm.module.css';

const UserCreateForm = ({ closeModal }) => {
	const { onSuccess } = useContext(UserFormsContext);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const { username, name, dispatchFormValues, isFormInvalid } = useCreateForm();

	return (
		<form
			className={style.form}
			onSubmit={ev =>
				handleSubmit(ev, name, username, setIsSubmitting, onSuccess, closeModal)
			}
		>
			<InputText
				label='Nombre'
				placeholder='John Doe'
				error={name.error}
				value={name.value}
				onChange={ev => dispatchFormValues(nameChanged(ev.target.value))}
			></InputText>
			<InputTextAsync
				label='Username'
				placeholder='johndoe'
				success={username.value && !username.loading && !username.error}
				loading={username.loading}
				error={username.error}
				value={username.value}
				onChange={ev => dispatchFormValues(usernameChanged(ev.target.value))}
			></InputTextAsync>
			<Select name='role'>
				<option value={USER_ROLES.TEACHER}>Profesor</option>
				<option value={USER_ROLES.STUDENT}>Alumno</option>
				<option value={USER_ROLES.OTHER}>Otro</option>
			</Select>
			<div className={style.active}>
				<InputCheckbox name='active' />
				<span>¿Activo?</span>
			</div>
			<Button type='submit' disabled={isFormInvalid || isSubmitting}>
				{isSubmitting ? 'Cargando...' : 'Crear usuario'}
			</Button>
		</form>
	);
};

const handleSubmit = async (
	ev,
	name,
	username,
	setIsSubmitting,
	onSuccess,
	closeModal
) => {
	ev.preventDefault();

	setIsSubmitting(true);

	const user = {
		id: crypto.randomUUID(),
		name: name.value,
		username: username.value,
		role: ev.target.role.value,
		active: ev.target.active.checked
	};

	const success = await createUser(user);

	if (success) {
		onSuccess();
		alertBox.success('Usuario creado con éxito');
	} else {
		alertBox.error('Error al crear usuario');
	}
	closeModal();
};

export default UserCreateForm;
