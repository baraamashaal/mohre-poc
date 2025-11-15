import type { ReactNode } from 'react'
import { Header } from '../shared/components/layouts/Header'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-aegov-bg">
      <Header />
      <main className="container mx-auto max-w-7xl px-4 py-8">{children}</main>
      <footer className="bg-aegov-black text-white py-8 mt-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Ministry of Human Resources and Emiratisation. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
