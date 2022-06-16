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

export const editFormReducer = (state, action) => {
	switch (action.type) {
		case EDIT_FORM_ACTIONS.NAME: {
			const error = validateName(action.value);

			return {
				...state,
				name: { value: action.value, error }
			};
		}
		case EDIT_FORM_ACTIONS.USERNAME: {
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
		case EDIT_FORM_ACTIONS.ROLE:
			return {
				...state,
				role: action.value
			};
		case EDIT_FORM_ACTIONS.ACTIVE:
			return {
				...state,
				active: action.value
			};
		case EDIT_FORM_ACTIONS.USERNAME_ERROR:
			return {
				...state,
				username: {
					value: state.username.value,
					error: action.value,
					loading: false
				}
			};
		case EDIT_FORM_ACTIONS.REPLACE:
			return action.value;
		default:
			throw new Error('Invalid action type');
	}
};
