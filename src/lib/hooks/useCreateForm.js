import { useEffect, useReducer } from 'react';
import { findUserByUsername } from '../api/usersApi';
import { validateName, validateUsername } from '../users/userValidations';

const formValuesReducer = (state, action) => {
	switch (action.type) {
		case 'name_changed': {
			const error = validateName(action.value);

			return {
				...state,
				name: { value: action.value, error }
			};
		}
		case 'username_changed': {
			const error = validateUsername(action.value);

			return {
				...state,
				username: { value: action.value, loading: !error, error }
			};
		}
		case 'username_error_changed':
			return {
				...state,
				username: {
					value: state.username.value,
					error: action.value,
					loading: false
				}
			};
		default:
			throw new Error('Invalid action type');
	}
};

export const useCreateForm = () => {
	const [formValues, dispatchFormValues] = useReducer(formValuesReducer, {
		name: {
			value: '',
			error: undefined
		},
		username: {
			value: '',
			loading: false,
			error: undefined
		}
	});

	useEffect(() => {
		if (!formValues.username.loading) return;

		const controller = new AbortController();
		const timeoutId = setTimeout(
			() =>
				validateUsernameIsAvailable(
					formValues.username.value,
					dispatchFormValues,
					controller.signal
				),
			500
		);
		return () => {
			controller.abort();
			clearTimeout(timeoutId);
		};
	}, [formValues.username.value, formValues.username.loading]);

	const isFormInvalid =
		!formValues.name.value ||
		formValues.name.error ||
		!formValues.username.value ||
		formValues.username.error ||
		formValues.username.loading;

	return { ...formValues, dispatchFormValues, isFormInvalid };
};

const validateUsernameIsAvailable = async (
	username,
	dispatchFormValues,
	signal
) => {
	const { user, error, abort } = await findUserByUsername(username, signal);

	if (abort) return;
	if (error)
		return dispatchFormValues({
			type: 'username_error_changed',
			value: 'Error al validar'
		});

	dispatchFormValues({
		type: 'username_error_changed',
		value: user ? 'Ya está en uso' : undefined
	});
};
