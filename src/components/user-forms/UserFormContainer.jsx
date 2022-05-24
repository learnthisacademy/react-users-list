import { useContext } from 'react';
import { USER_FORMS } from '../../constants/userForms';
import { UserFormsContext } from '../../lib/contexts/UserFormsContext';
import IconButton from '../buttons/IconButton';
import CrossIcon from '../icons/CrossIcon';
import UserCreateForm from './UserCreateForm';
import UserDeleteForm from './UserDeleteForm';
import UserEditForm from './UserEditForm';
import style from './UserFormContainer.module.css';

const FORMS = {
	[USER_FORMS.CREATE]: <UserCreateForm />,
	[USER_FORMS.EDIT]: <UserEditForm />,
	[USER_FORMS.DELETE]: <UserDeleteForm />
};

const UserFormContainer = () => {
	const { currentForm, setFiltersForm } = useContext(UserFormsContext);

	const form = FORMS[currentForm];

	if (!form) return null;

	return (
		<div className={style.wrapper}>
			<IconButton
				className={style.close}
				icon={CrossIcon}
				filled
				onClick={setFiltersForm}
			/>
			{form}
		</div>
	);
};

export default UserFormContainer;
