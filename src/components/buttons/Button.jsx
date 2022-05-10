import style from './Button.module.css';

const KIND_CLASSNAME = {
	primary: style.primary,
	secondary: style.secondary
};

const Button = ({ kind = 'primary', className, ...props }) => (
	<button
		{...props}
		className={`${style.button} ${KIND_CLASSNAME[kind]} ${className || ''}`}
	></button>
);

export default Button;
