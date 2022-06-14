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
			const isInitial = action.value === action.currentUsername;

			return {
				...state,
				username: {
					value: action.value,
					loading: !error && !isInitial,
					error
				}
			};
		}
		case 'role_changed':
			return {
				...state,
				role: action.value
			};
		case 'active_changed':
			return {
				...state,
				active: action.value
			};
		case 'username_error_changed':
			return {
				...state,
				username: {
					value: state.username.value,
					error: action.value,
					loading: false
				}
			};
		case 'replace':
			return action.value;
		default:
			throw new Error('Invalid action type');
	}
};

export const useEditForm = user => {
	const [formValues, dispatchFormValues] = useReducer(
		formValuesReducer,
		user,
		getInitialState
	);

	useEffect(() => {
		dispatchFormValues({ type: 'replace', value: getInitialState(user) });
	}, [user]);

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
		areInitialValues(formValues, user) ||
		formValues.name.error ||
		formValues.username.error ||
		formValues.username.loading;

	return {
		...formValues,
		dispatchFormValues,
		isFormInvalid
	};
};

const getInitialState = user => ({
	name: {
		value: user.name,
		error: undefined
	},
	username: {
		value: user.username,
		loading: false,
		error: undefined
	},
	role: user.role,
	active: user.active
});

const areInitialValues = (formValues, user) =>
	formValues.name.value === user.name &&
	formValues.username.value === user.username &&
	formValues.role === user.role &&
	formValues.active === user.active;

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
