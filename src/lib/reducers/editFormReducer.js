import { EDIT_FORM_ACTIONS } from '../../constants/editFormActions';
import { validateName, validateUsername } from '../users/userValidations';

export const getEditFormInitialState = user => ({
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

export const editFormReducer = (state, { type, payload }) => {
	switch (type) {
		case EDIT_FORM_ACTIONS.NAME: {
			const error = validateName(payload);

			return {
				...state,
				name: { value: payload, error }
			};
		}
		case EDIT_FORM_ACTIONS.USERNAME: {
			const error = validateUsername(payload.username);

			return {
				...state,
				username: {
					value: payload.username,
					loading: !error && !payload.isInitial,
					error
				}
			};
		}
		case EDIT_FORM_ACTIONS.ROLE:
			return {
				...state,
				role: payload
			};
		case EDIT_FORM_ACTIONS.ACTIVE:
			return {
				...state,
				active: payload
			};
		case EDIT_FORM_ACTIONS.USERNAME_ERROR:
			return {
				...state,
				username: {
					value: state.username.value,
					error: payload,
					loading: false
				}
			};
		default:
			throw new Error('Invalid action type');
	}
};
