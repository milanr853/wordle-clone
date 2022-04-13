import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react"
import myNewStyles from './ExtendTheme';


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ChakraProvider theme={myNewStyles}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,

);