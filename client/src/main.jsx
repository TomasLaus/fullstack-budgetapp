import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import dotenv from 'dotenv'
import axios from 'axios'

// dotenv.config();

axios.defaults.baseURL = "https://alkemy-challenge-jls.herokuapp.com" || "http://localhost:3001"
console.log(import.meta.env)
console.log(axios.defaults)
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
