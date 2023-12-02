
import { BrowserRouter } from 'react-router-dom';
import Root from './Pages/Root';
import React from 'react';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Root />
		</BrowserRouter>
	);
}

export default App;
