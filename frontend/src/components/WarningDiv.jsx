import { motion } from 'framer-motion';

const WarningDiv = props =>{
    return(
        <>
            <motion.div
            initial={{ x: 8, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -8, opacity: 0 }}
            transition={{ type: 'spring' }}
            className={props.className}
            >
            {props.textContent}</motion.div>
        </>
    )
}

export default WarningDiv