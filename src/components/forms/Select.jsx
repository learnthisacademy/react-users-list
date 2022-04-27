import ArrowDownIcon from '../icons/ArrowDownIcon';
import style from './Select.module.css';

const Select = ({ className, ...props }) => (
	<div className={`${style.wrapper} ${className || ''}`}>
		<select {...props} className={style.select}></select>
		<ArrowDownIcon className={style.arrow} />
	</div>
);

export default Select;
