import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { Toaster } from 'sonner'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
    <AuthProvider>
    <App />
    <Toaster richColors position="bottom-right" />
    </AuthProvider>
    </GoogleReCaptchaProvider>
  </StrictMode>,
)
