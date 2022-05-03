import style from './IconButton.module.css';

const CLASSNAMES = {
	black: {
		normal: style.black,
		filled: style.blackFilled
	},
	red: {
		normal: style.red,
		filled: style.redFilled
	}
};

const IconButton = ({
	kind = 'black',
	filled,
	icon: Icon,
	className,
	...props
}) => {
	const classNames = CLASSNAMES[kind];
	const classNameKey = filled ? 'filled' : 'normal';
	const kindClassName = classNames[classNameKey];

	return (
		<button
			{...props}
			className={`${style.button} ${kindClassName} ${className}`}
		>
			<Icon className={style.icon}></Icon>
		</button>
	);
};

export default IconButton;
