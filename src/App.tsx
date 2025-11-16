import { AppRoutes } from './routes'
import { useDirection } from './shared/hooks'
import './lib/i18n'

function App() {
  // Automatically handle RTL/LTR direction switching
  // Sets HTML dir and lang attributes based on current language
  useDirection()

  return <AppRoutes />
}

export default App
