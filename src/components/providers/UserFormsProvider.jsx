import { UserFormsContext } from '../../lib/contexts/UserFormsContext';
import { useSelectedForm } from '../../lib/hooks/useSelectedForm';

const UserFormsProvider = ({ resetFilters, children }) => {
	const { setFiltersForm, ...restSelectedForm } = useSelectedForm();

	const onSuccess = () => {
		resetFilters();
		setFiltersForm();
	};

	return (
		<UserFormsContext.Provider
			value={{
				setFiltersForm,
				onSuccess,
				...restSelectedForm
			}}
		>
			{children}
		</UserFormsContext.Provider>
	);
};

export default UserFormsProvider;
