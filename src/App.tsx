
import { BrowserRouter } from 'react-router-dom';
import Root from './components/pages/Root';
import React from 'react';

const App: React.FC = () => {
  return (
     <BrowserRouter>
        <Root />
      </BrowserRouter>
	);
}

export default App;
