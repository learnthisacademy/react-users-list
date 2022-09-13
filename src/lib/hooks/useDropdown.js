import { useEffect, useRef, useState } from 'react';

export const useDropdown = () => {
	const [dropdownOpened, setDropdownOpened] = useState(false);
	const dropdownRef = useRef(null);

	const openDropdown = () => setDropdownOpened(true);
	const closeDropdown = () => setDropdownOpened(false);

	useEffect(() => {
		if (!dropdownOpened) return;

		const handleClickOutside = ev => {
			if (!dropdownRef.current.contains(ev.target)) closeDropdown();
		};

		document.addEventListener('click', handleClickOutside, { capture: true });

		return () =>
			document.removeEventListener('click', handleClickOutside, {
				capture: true
			});
	}, [dropdownOpened]);

	return { dropdownOpened, dropdownRef, openDropdown, closeDropdown };
};
