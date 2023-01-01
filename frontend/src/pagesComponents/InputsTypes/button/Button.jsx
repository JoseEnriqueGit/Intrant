const Button = props => {
	return (
		<>
			<button
				title={props.title}
				className={props.className}
				type={props.type}
				onClick={props.functionOnClick}
				disabled={props.disabled}
			>
				{props.children}
			</button>
		</>
	);
};

export default Button;
