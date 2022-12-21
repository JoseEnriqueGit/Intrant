// imports
import { Routes, Route } from 'react-router-dom';
// CSS
import '../public/Css/index.css';
// Components
import {
	MultiStepsForm,
	MultiStepsModifyCitation,
	CancelForm,
} from './pagesComponents';

function App() {
	return (
		<>
			<Routes>
				<Route index element={<MultiStepsForm />} />
				<Route path='/Modificar' element={<MultiStepsModifyCitation />} />
				<Route path='/CancelarCita' element={<CancelForm />} />
			</Routes>
		</>
	);
}

export default App;
