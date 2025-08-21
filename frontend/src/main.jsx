import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./App.css"
import { ContextProvider } from './context/Context.jsx'
createRoot(document.getElementById('root')).render(
    <ContextProvider>
    <App />
    </ContextProvider>
)
