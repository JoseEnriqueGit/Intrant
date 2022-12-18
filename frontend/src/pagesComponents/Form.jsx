import { motion } from 'framer-motion';

const Form = props => {
	return (
		<motion.form
			initial={{ x: 20, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -20, opacity: 0 }}
			transition={{ type: 'spring' }}
			className={props.className}
			onSubmit={props.onSubmit}
		>
			{props.children}
		</motion.form>
	);
}

export default Form;
