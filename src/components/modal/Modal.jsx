import { createPortal } from 'react-dom';
import IconButton from '../buttons/IconButton';
import CrossIcon from '../icons/CrossIcon';
import style from './Modal.module.css';

const Modal = ({ closeModal, children }) => {
	if (!children) return null;

	return createPortal(
		<div className={style.overlay}>
			<div className={style.modal}>
				<IconButton
					className={style.close}
					icon={CrossIcon}
					filled
					onClick={closeModal}
				/>
				{children}
			</div>
		</div>,
		document.getElementById('modal')
	);
};

export default Modal;
