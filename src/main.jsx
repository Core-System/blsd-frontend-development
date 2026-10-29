import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { Toaster } from 'sonner'
import VLibras from './components/VLibras.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster richColors position="bottom-right" />
      <VLibras />
    </AuthProvider>
  </StrictMode>,
)
