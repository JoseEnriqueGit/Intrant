const OutPut = props => {
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
					defaultValue={props.value || ''}
				/>
			</label>
		</>
	);
}

export default OutPut;
