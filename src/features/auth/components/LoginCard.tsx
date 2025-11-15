import type { ReactNode } from 'react'
import { Card } from '../../../shared/components/ui'

interface LoginCardProps {
  children: ReactNode
  title?: string
  description?: string
}

export function LoginCard({ children, title, description }: LoginCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-aegov-bg px-4 py-8">
      <Card className="w-full sm:w-[26rem] min-h-[32rem] xl:min-h-[35rem] flex flex-col justify-between border border-primary-400">
        <div className="space-y-6">
          {/* Logo section */}
          <div className="flex justify-center">
            <div className="text-4xl font-bold text-techblue-600">
              MOHRE
            </div>
          </div>

          {/* Title */}
          {title && (
            <h1 className="text-2xl font-bold text-aegov-black text-center">
              {title}
            </h1>
          )}

          {/* Content */}
          <div className="space-y-4">
            {children}
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-aeblack-800 text-center">
              {description}
            </p>
          )}
        </div>

        {/* Footer info */}
        <div className="text-xs text-gray-500 text-center pt-6">
          <p>A single trusted digital identity for all citizens, residents and visitors.</p>
        </div>
      </Card>
    </div>
  )
}
