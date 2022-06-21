import { FILTERS_ACTIONS } from '../../constants/filtersActions';

export const searchChanged = search => ({
	type: FILTERS_ACTIONS.SEARCH,
	payload: search
});

export const onlyActiveChanged = onlyActive => ({
	type: FILTERS_ACTIONS.ONLY_ACTIVE,
	payload: onlyActive
});

export const sortByChanged = sortBy => ({
	type: FILTERS_ACTIONS.SORT_BY,
	payload: sortBy
});

export const pageChanged = page => ({
	type: FILTERS_ACTIONS.PAGE,
	payload: page
});

export const itemsPerPageChanged = itemsPerPage => ({
	type: FILTERS_ACTIONS.ITEMS_PER_PAGE,
	payload: itemsPerPage
});

export const reset = () => ({
	type: FILTERS_ACTIONS.RESET
});
