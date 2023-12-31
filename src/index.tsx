import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './services/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ChakraProvider>
        <BrowserRouter>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
        </BrowserRouter>
    </ChakraProvider>
);

reportWebVitals();
