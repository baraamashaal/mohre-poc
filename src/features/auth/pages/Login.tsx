import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../../../shared/constants'
import { UAEPassLogin } from '../components/UAEPassLogin'
import { LegacyLogin } from '../components/LegacyLogin'
import { User } from '../types/auth.types'

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showLegacyLogin, setShowLegacyLogin] = useState(false)

  const handleLoginSuccess = (user: User) => {
    login(user)
    void navigate(ROUTES.DASHBOARD)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-aegov-bg px-4 py-8">
      {/* Login Container - Exact HTML from design */}
      <div className="w-full sm:w-[26rem] mx-auto p-6 text-center space-y-10 border border-primary-400 rounded md:rounded-lg xl:rounded-xl min-h-[32rem] xl:min-h-[35rem] flex flex-wrap justify-between flex-col content-between [&>*]:w-full" id="accordion-collapse" data-accordion="collapse">

        {/* Logo */}
        <div>
          <img src="/img/block_assets/logo-ministry.png" alt="Ministry of Human Resources & Emiratisation" className="mx-auto max-w-full" />
        </div>

        {/* UAE Pass Login Section */}
        <UAEPassLogin
          onLoginSuccess={handleLoginSuccess}
          className={showLegacyLogin ? 'hidden' : ''}
        />

        {/* Legacy Login Section */}
        <LegacyLogin
          onLoginSuccess={handleLoginSuccess}
          className={!showLegacyLogin ? 'hidden' : ''}
        />

        {/* Footer Links */}
        <div>
          <div className={`aria-expanded:hidden pointer-events-none ${showLegacyLogin ? 'hidden' : ''}`} data-accordion-target="#aegov-accordion-body-2" aria-expanded="false" aria-controls="aegov-accordion-body-2">
            <p className="text-aeblack-800 mb-4">Need a UAE PASS account? <a href="https://uaepass.ae/signup" target="_blank" rel="noopener noreferrer" className="pointer-events-auto">Create an account</a></p>
            <p className="text-aeblack-800">
              <a href="#" className="pointer-events-auto" onClick={(e) => {
                e.preventDefault()
                setShowLegacyLogin(true)
              }}>Use other login option</a>
            </p>
          </div>
        </div>

        <div className={`aria-expanded:hidden ${showLegacyLogin ? '' : 'hidden'}`} data-accordion-target="#aegov-accordion-body-1" aria-expanded="true" aria-controls="aegov-accordion-body-1">
          Switch to <a href="#" onClick={(e) => {
            e.preventDefault()
            setShowLegacyLogin(false)
          }}>login with UAE pass</a>
        </div>
      </div>
    </div>
  )
}
