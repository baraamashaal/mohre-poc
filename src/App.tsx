import { AppRoutes } from './routes'
import { useDirection } from './shared/hooks'
import { AuthInitializer } from './features/auth'
import './lib/i18n'

function App() {
  // Automatically handle RTL/LTR direction switching
  // Sets HTML dir and lang attributes based on current language
  useDirection()

  return (
    <AuthInitializer>
      <AppRoutes />
    </AuthInitializer>
  )
}

export default App
