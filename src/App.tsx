import { useState } from 'react'

function App() {
  const [showAlert, setShowAlert] = useState(true)

  return (
    <div className="min-h-screen bg-aegov-bg">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-techblue-600 to-techblue-800 text-white py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">
              UAE Design System Demo
            </h1>
            <p className="text-xl mb-8 text-techblue-100">
              Showcasing the official design system for UAE government entities
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="aegov-btn aegov-btn-solid btn-primary btn-lg">
                Get Started
              </button>
              <button className="aegov-btn aegov-btn-outline btn-white btn-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12 space-y-12">
        {/* Alert Section */}
        {showAlert && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-aegov-black mb-6">Alert Components</h2>

            <div className="aegov-alert aegov-alert-info">
              <div className="alert-icon">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="alert-content">
                <p className="alert-title">Information</p>
                <p className="alert-description">This is an informational message using the UAE Design System.</p>
              </div>
              <button onClick={() => { setShowAlert(false); }} className="alert-close">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="aegov-alert aegov-alert-success">
              <div className="alert-icon">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="alert-content">
                <p className="alert-title">Success</p>
                <p className="alert-description">Your application has been submitted successfully!</p>
              </div>
            </div>

            <div className="aegov-alert aegov-alert-warning">
              <div className="alert-icon">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="alert-content">
                <p className="alert-title">Warning</p>
                <p className="alert-description">Please review your information before submitting.</p>
              </div>
            </div>

            <div className="aegov-alert aegov-alert-error">
              <div className="alert-icon">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="alert-content">
                <p className="alert-title">Error</p>
                <p className="alert-description">There was an error processing your request.</p>
              </div>
            </div>
          </div>
        )}

        {/* Button Variations */}
        <div>
          <h2 className="text-3xl font-bold text-aegov-black mb-6">Button Components</h2>

          <div className="space-y-6">
            {/* Solid Buttons */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Solid Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="aegov-btn aegov-btn-solid btn-primary">Primary</button>
                <button className="aegov-btn aegov-btn-solid btn-secondary">Secondary</button>
                <button className="aegov-btn aegov-btn-solid btn-primary btn-sm">Small</button>
                <button className="aegov-btn aegov-btn-solid btn-primary btn-lg">Large</button>
              </div>
            </div>

            {/* Outline Buttons */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Outline Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="aegov-btn aegov-btn-outline btn-primary">Primary</button>
                <button className="aegov-btn aegov-btn-outline btn-secondary">Secondary</button>
                <button className="aegov-btn aegov-btn-outline btn-primary" disabled>Disabled</button>
              </div>
            </div>

            {/* Soft Buttons */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Soft Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="aegov-btn aegov-btn-soft btn-primary">Primary</button>
                <button className="aegov-btn aegov-btn-soft btn-secondary">Secondary</button>
              </div>
            </div>

            {/* Link Buttons */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Link Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="aegov-btn aegov-btn-link btn-primary">Link Button</button>
                <button className="aegov-btn aegov-btn-link btn-secondary">Secondary Link</button>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div>
          <h2 className="text-3xl font-bold text-aegov-black mb-6">Card Components</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service Card */}
            <div className="aegov-card card-base">
              <div className="card-icon">
                <svg className="w-8 h-8 text-techblue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="card-title">Apply for Work Permit</h3>
              <p className="card-description">
                Submit a new work permit application for your employees through our online portal.
              </p>
              <button className="aegov-btn aegov-btn-link btn-primary">
                Start Application →
              </button>
            </div>

            {/* Service Card 2 */}
            <div className="aegov-card card-base">
              <div className="card-icon">
                <svg className="w-8 h-8 text-techblue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="card-title">Employee Management</h3>
              <p className="card-description">
                View and manage all employees registered under your company profile.
              </p>
              <button className="aegov-btn aegov-btn-link btn-primary">
                View Employees →
              </button>
            </div>

            {/* Service Card 3 */}
            <div className="aegov-card card-base">
              <div className="card-icon">
                <svg className="w-8 h-8 text-techblue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="card-title">Submit Complaint</h3>
              <p className="card-description">
                File a complaint or report an issue regarding employee services.
              </p>
              <button className="aegov-btn aegov-btn-link btn-primary">
                File Complaint →
              </button>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div>
          <h2 className="text-3xl font-bold text-aegov-black mb-6">Form Components</h2>

          <div className="aegov-card card-base max-w-2xl">
            <h3 className="text-2xl font-semibold mb-6">Contact Form</h3>

            <form className="space-y-6">
              {/* Name Input */}
              <div className="aegov-form-control">
                <label htmlFor="name" className="form-label">Full Name</label>
                <div className="form-control-input">
                  <input
                    type="text"
                    id="name"
                    className="control-base"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="aegov-form-control">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="form-control-input">
                  <input
                    type="email"
                    id="email"
                    className="control-base"
                    placeholder="email@example.com"
                  />
                </div>
                <p className="form-description">We'll never share your email with anyone else.</p>
              </div>

              {/* Phone Input with Icon */}
              <div className="aegov-form-control">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <div className="form-control-input">
                  <span className="control-prefix">+971</span>
                  <input
                    type="tel"
                    id="phone"
                    className="control-base"
                    placeholder="50 123 4567"
                  />
                </div>
              </div>

              {/* Textarea */}
              <div className="aegov-form-control">
                <label htmlFor="message" className="form-label">Message</label>
                <div className="form-control-input">
                  <textarea
                    id="message"
                    rows={4}
                    className="control-base"
                    placeholder="Enter your message here..."
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button type="submit" className="aegov-btn aegov-btn-solid btn-primary">
                  Submit Application
                </button>
                <button type="button" className="aegov-btn aegov-btn-outline btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Badge Components */}
        <div>
          <h2 className="text-3xl font-bold text-aegov-black mb-6">Badge Components</h2>

          <div className="flex flex-wrap gap-3">
            <span className="aegov-badge badge-primary">Primary</span>
            <span className="aegov-badge badge-secondary">Secondary</span>
            <span className="aegov-badge badge-success">Success</span>
            <span className="aegov-badge badge-warning">Warning</span>
            <span className="aegov-badge badge-error">Error</span>
            <span className="aegov-badge badge-info">Info</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-aegov-black text-white py-12 mt-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">About</h4>
              <p className="text-gray-400">
                UAE Design System for government entities
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Components</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <p className="text-gray-400">
                design.system@tdra.gov.ae
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
