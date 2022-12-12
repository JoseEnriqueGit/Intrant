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
				{props.content}
			</button>
		</>
	);
};

export default Button;
