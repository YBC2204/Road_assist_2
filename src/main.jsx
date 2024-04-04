import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ModalProvider } from './Context/Modalcon.jsx'
import { StatusProvider } from './Context/StatusContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
 
 <React.StrictMode>
    <ModalProvider>
    <StatusProvider>
      <App />
      </StatusProvider>
    </ModalProvider>
  </React.StrictMode>,
)
