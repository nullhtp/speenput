import './assets/main.css'
import './assets/tailwind.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { NextUIProvider } from '@nextui-org/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>
)
