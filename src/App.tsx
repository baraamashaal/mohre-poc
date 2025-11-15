import { useEffect } from 'react'
import { AppRoutes } from './routes'
import './lib/i18n'

function App() {
  useEffect(() => {
    // Set initial direction based on default language
    document.documentElement.dir = 'ltr'
    document.documentElement.lang = 'en'
  }, [])

  return <AppRoutes />
}

export default App
