import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { I18nProvider } from './providers/I18nProvider'
import { CartProvider } from './providers/CartProvider'
import { UiProvider } from './providers/UiProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <CartProvider>
        <UiProvider>
          <App />
        </UiProvider>
      </CartProvider>
    </I18nProvider>
  </React.StrictMode>
)
