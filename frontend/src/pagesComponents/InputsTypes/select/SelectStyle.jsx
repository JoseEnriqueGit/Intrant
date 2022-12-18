const customStyles = {
	control: provided => ({
		...provided,
		height: '36px',
		borderRadius: 10,
		borderColor: 'rgba(255, 101, 0, .5)',
		borderWidth: 2,
		boxShadow: 'none',
		padding: 0,
		'&:hover': {
			borderColor: '#ff6500',
		},
	}),
	input: provided => ({
		...provided,
		height: '36px',
		padding: 0,
		margin: 0,
	}),
	valueContainer: (provided, state) => ({
		...provided,
		fontSize: 'medium',
		padding: '0px 6px',
	}),
	option: (provided, state) => ({
		...provided,
		color: state.isSelected ? '#fff' : '#231F20',
		padding: 10,
	}),
	singleValue: (provided, state) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = 'opacity 300ms';

		return { ...provided, opacity, transition };
	},
};
export default customStyles;