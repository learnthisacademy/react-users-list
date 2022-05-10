import CheckCircleIcon from '../icons/CheckCircleIcon';
import CrossCircleIcon from '../icons/CrossCircleIcon';
import UpdateIcon from '../icons/UpdateIcon';
import style from './InputTextAsync.module.css';

const InputTextAsync = ({
	label,
	loading,
	success,
	error,
	className,
	...props
}) => {
	const icon = getIcon(loading, success, error);

	return (
		<label className={`${style.wrapper} ${className || ''}`}>
			<span className={style.label}>{label}</span>
			<input
				{...props}
				className={`${style.input} ${error ? style.borderError : ''}`}
				type='text'
			></input>
			{icon}
			{error && <span className={style.error}>{error}</span>}
		</label>
	);
};

const getIcon = (loading, success, error) => {
	if (loading) return <UpdateIcon className={style.loadingIcon} />;
	if (success) return <CheckCircleIcon className={style.successIcon} />;
	if (error) return <CrossCircleIcon className={style.errorIcon} />;

	return null;
};

export default InputTextAsync;
