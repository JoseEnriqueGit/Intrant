const Input = props => {
	return (
		<>
			<label>
				{props.label}
				<input
					type={props.type}
					id={props.id}
					name={props.name}
					autoComplete={props.autoComplete}
					disabled={props.disabled}
					autoFocus={props.focus}
					defaultValue={props.defaultValue || ''}
					onChange={props.onChange}
					min={props.min}
					required
				/>
			</label>
		</>
	);
}

export default Input;
