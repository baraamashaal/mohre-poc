import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../../../shared/constants'
import { UAEPassLogin } from '../components/UAEPassLogin'
import { LegacyLogin } from '../components/LegacyLogin'
import type {User} from '../types/auth.types';

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  // Derive state directly from URL parameter (single source of truth)
  const showLegacyLogin = searchParams.get('isLegacy') === 'true'
  const showUaePassLogin = !showLegacyLogin
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
        {
          showUaePassLogin && 
          <>
              <UAEPassLogin onLoginSuccess={handleLoginSuccess} />
              <div>
                  <p className="text-aeblack-800 mb-4">Need a UAE PASS account? <a href="https://uaepass.ae/signup" target="_blank" rel="noopener noreferrer" className="pointer-events-auto">Create an account</a></p>
                  <p className="text-aeblack-800">
                      <a href="#" className="pointer-events-auto" onClick={(e) => {
                        e.preventDefault()
                        setSearchParams({ isLegacy: 'true' })
                      }}>Use other login option</a>
                  </p>
              </div>
          </>
        }
        

        {/* Legacy Login Section */}
        {
          showLegacyLogin &&
          <>
              <LegacyLogin onLoginSuccess={handleLoginSuccess} />
              <div>
                  Switch to <a href="#" onClick={(e) => {
                e.preventDefault()
                setSearchParams({})
              }}>login with UAE pass</a>
              </div>
          </>
        }
        

        {/* Footer Links */}
          

        
      </div>
    </div>
  )
}
