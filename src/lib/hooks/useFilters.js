import { useState } from 'react';
import { SORT_OPTIONS } from '../../constants/sortOptions';

export const useFilters = () => {
	const [filters, setFilters] = useState({
		search: '',
		onlyActive: false,
		sortBy: SORT_OPTIONS.DEFAULT
	});

	const setSearch = search =>
		setFilters({
			...filters,
			search
		});

	const setOnlyActive = onlyActive => {
		const newSortBy =
			onlyActive && filters.sortBy === SORT_OPTIONS.ACTIVE
				? SORT_OPTIONS.DEFAULT
				: filters.sortBy;

		setFilters({
			...filters,
			sortBy: newSortBy,
			onlyActive
		});
	};

	const setSortBy = sortBy =>
		setFilters({
			...filters,
			sortBy
		});

	return {
		...filters,
		setSearch,
		setOnlyActive,
		setSortBy
	};
};
