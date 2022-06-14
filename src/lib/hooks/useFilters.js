import { useReducer } from 'react';
import { PAGINATION } from '../../constants/pagination';
import { SORT_OPTIONS } from '../../constants/sortOptions';

const INITIAL_STATE = {
	search: '',
	onlyActive: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: PAGINATION.DEFAULT_PAGE,
	itemsPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE
};

const filtersReducer = (state, action) => {
	switch (action.type) {
		case 'search_changed':
			return {
				...state,
				page: PAGINATION.DEFAULT_PAGE,
				search: action.value
			};
		case 'only_active_changed': {
			const newSortBy =
				action.value && state.sortBy === SORT_OPTIONS.ACTIVE
					? SORT_OPTIONS.DEFAULT
					: state.sortBy;

			return {
				...state,
				sortBy: newSortBy,
				page: PAGINATION.DEFAULT_PAGE,
				onlyActive: action.value
			};
		}
		case 'sort_by_changed':
			return {
				...state,
				page: PAGINATION.DEFAULT_PAGE,
				sortBy: action.value
			};
		case 'page_changed':
			return {
				...state,
				page: action.value
			};
		case 'items_per_page_changed':
			return {
				...state,
				page: PAGINATION.DEFAULT_PAGE,
				itemsPerPage: action.value
			};
		case 'reset':
			return { ...INITIAL_STATE };
		default:
			throw new Error('Invalid action type');
	}
};

export const useFilters = () => {
	const [filters, dispatchFilters] = useReducer(filtersReducer, INITIAL_STATE);

	return {
		filters,
		dispatchFilters
	};
};
