import { useState, createContext } from 'react';

const PageContext = createContext();

export const PageContextProvider = props => {
    const [page, setPage] = useState(1);

	return (
		<PageContext.Provider value={{ page, setPage }}>
			{props.children}
		</PageContext.Provider>
	);
};

export default PageContext;