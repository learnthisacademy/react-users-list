import { CREATE_FORM_ACTIONS } from '../../constants/createFormActions';
import { validateName, validateUsername } from '../users/userValidations';

export const CREATE_FORM_INITIAL_STATE = {
	name: {
		value: '',
		error: undefined
	},
	username: {
		value: '',
		loading: false,
		error: undefined
	}
};

export const createFormReducer = (state, { type, payload }) => {
	switch (type) {
		case CREATE_FORM_ACTIONS.NAME: {
			const error = validateName(payload);

			return {
				...state,
				name: { value: payload, error }
			};
		}
		case CREATE_FORM_ACTIONS.USERNAME: {
			const error = validateUsername(payload);

			return {
				...state,
				username: { value: payload, loading: !error, error }
			};
		}
		case CREATE_FORM_ACTIONS.USERNAME_ERROR:
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
