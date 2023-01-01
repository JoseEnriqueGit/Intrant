import { useState, createContext } from 'react';

const LoadingContext = createContext();

export const LoadingContextProvider = props => {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<LoadingContext.Provider value={{ isLoading, setIsLoading }}>
			{props.children}
		</LoadingContext.Provider>
	);
};

export default LoadingContext;