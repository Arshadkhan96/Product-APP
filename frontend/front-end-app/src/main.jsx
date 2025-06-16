import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

// Create basic theme
const theme = extendTheme({})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* This must wrap your app */}
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)