import { useContext } from 'react';
import { SORT_OPTIONS } from '../../constants/sortOptions';
import { USER_FORMS } from '../../constants/userForms';
import { UserFormsContext } from '../../lib/contexts/UserFormsContext';
import Button from '../buttons/Button';
import InputCheckbox from '../forms/InputCheckbox';
import InputSearch from '../forms/InputSearch';
import Select from '../forms/Select';
import style from './UsersListFilters.module.css';

const UsersListFilters = ({ search, onlyActive, sortBy, dispatchFilters }) => {
	const { currentForm, setCreateForm } = useContext(UserFormsContext);

	if (currentForm !== USER_FORMS.FILTERS) return null;

	return (
		<div className={style.form}>
			<div className={style.row}>
				<InputSearch
					placeholder='Buscar...'
					value={search}
					onChange={ev =>
						dispatchFilters({ type: 'search_changed', value: ev.target.value })
					}
				/>
				<Select
					value={sortBy}
					onChange={ev =>
						dispatchFilters({
							type: 'sort_by_changed',
							value: Number(ev.target.value)
						})
					}
				>
					<option value={SORT_OPTIONS.DEFAULT}>Por defecto</option>
					<option value={SORT_OPTIONS.NAME}>Por nombre</option>
					<option value={SORT_OPTIONS.ROLE}>Por rol</option>
					{!onlyActive && (
						<option value={SORT_OPTIONS.ACTIVE}>Por activos</option>
					)}
				</Select>
			</div>
			<div className={style.row}>
				<div className={style.active}>
					<InputCheckbox
						className={style.checkbox}
						checked={onlyActive}
						onChange={ev =>
							dispatchFilters({
								type: 'only_active_changed',
								value: ev.target.checked
							})
						}
					/>
					<p>Mostrar sólo activos</p>
				</div>
				<Button onClick={setCreateForm}>Añadir usuario</Button>
			</div>
		</div>
	);
};
export default UsersListFilters;
