import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../shared/components/layouts'

/**
 * Main Layout Component
 *
 * Provides consistent layout across all authenticated pages:
 * - Header (navigation, user menu, language switcher)
 * - Content area (renders child routes via Outlet)
 * - Footer (copyright, links)
 */
export function MainLayout() {
  return (
    <div className="min-h-screen bg-aegov-bg flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
