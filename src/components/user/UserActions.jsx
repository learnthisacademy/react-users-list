import { useState } from 'react';
import { useDropdown } from '../../lib/hooks/useDropdown';
import IconButton from '../buttons/IconButton';
import DotsIcon from '../icons/DotsIcon';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import Modal from '../modal/Modal';
import UserDeleteForm from '../user-forms/UserDeleteForm';
import UserEditForm from '../user-forms/UserEditForm';
import style from './UserActions.module.css';

const UserActions = ({ user }) => {
	const { modalContent, closeModal, openEditModal, openDeleteModal } =
		useModal(user);
	const { dropdownOpened, dropdownRef, openDropdown, closeDropdown } =
		useDropdown();

	return (
		<div className={style.wrapper}>
			<Modal closeModal={closeModal}>{modalContent}</Modal>
			<IconButton icon={DotsIcon} onClick={() => openDropdown()} />
			{dropdownOpened && (
				<ul
					ref={dropdownRef}
					className={style.dropdown}
					onClick={closeDropdown}
				>
					<li onClick={openEditModal}>
						<PencilIcon />
						<span>Editar</span>
					</li>
					<li onClick={openDeleteModal}>
						<TrashIcon />
						<span>Eliminar</span>
					</li>
				</ul>
			)}
		</div>
	);
};

const useModal = user => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => setModalContent();

	const openEditModal = () =>
		setModalContent(
			<UserEditForm closeModal={closeModal} currentUser={user} />
		);

	const openDeleteModal = () =>
		setModalContent(
			<UserDeleteForm closeModal={closeModal} currentUser={user} />
		);

	return { modalContent, closeModal, openEditModal, openDeleteModal };
};

export default UserActions;
