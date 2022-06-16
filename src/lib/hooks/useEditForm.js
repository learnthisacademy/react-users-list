import { useEffect, useReducer } from 'react';
import { EDIT_FORM_ACTIONS } from '../../constants/editFormActions';
import { findUserByUsername } from '../api/usersApi';
import {
	editFormReducer,
	getEditFormInitialState
} from '../reducers/editFormReducer';

export const useEditForm = user => {
	const [formValues, dispatchFormValues] = useReducer(
		editFormReducer,
		user,
		getEditFormInitialState
	);

	useEffect(() => {
		dispatchFormValues({
			type: EDIT_FORM_ACTIONS.REPLACE,
			value: getEditFormInitialState(user)
		});
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
			type: EDIT_FORM_ACTIONS.USERNAME_ERROR,
			value: 'Error al validar'
		});

	dispatchFormValues({
		type: EDIT_FORM_ACTIONS.USERNAME_ERROR,
		value: user ? 'Ya está en uso' : undefined
	});
};
