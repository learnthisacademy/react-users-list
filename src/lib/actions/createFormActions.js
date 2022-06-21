import { CREATE_FORM_ACTIONS } from '../../constants/createFormActions';

export const nameChanged = name => ({
	type: CREATE_FORM_ACTIONS.NAME,
	payload: name
});

export const usernameChanged = username => ({
	type: CREATE_FORM_ACTIONS.USERNAME,
	payload: username
});

export const usernameErrorChanged = error => ({
	type: CREATE_FORM_ACTIONS.USERNAME_ERROR,
	payload: error
});
