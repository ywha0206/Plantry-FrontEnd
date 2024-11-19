import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "@/main.scss"
import { QueryClientProvider } from '@tanstack/react-query'

createRoot(document.getElementById('root')).render(
  // <QueryClientProvider client={client}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </QueryClientProvider>
)
