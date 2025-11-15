import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { XIcon } from '@phosphor-icons/react'
import { z } from 'zod'

// ============================================================================
// Schema
// ============================================================================

const toastSchema = z.object({
  children: z.custom<React.ReactNode>(),
  duration: z.number().default(5000),
  showToast: z.boolean().optional(),
})

// ============================================================================
// Types
// ============================================================================

export interface ToastProps {
  children: React.ReactNode
  duration?: number
  showToast?: boolean
}

// ============================================================================
// Toast Component
// ============================================================================

export const Toast: React.FC<ToastProps> = ({ children, duration = 5000, showToast = false }) => {
  const [open, setOpen] = React.useState(false)
  const timerRef = React.useRef<number | null>(null)

  const handleShowToast = React.useCallback((): void => {
    setOpen(false)
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
    }
    timerRef.current = window.setTimeout(() => {
      setOpen(true)
    }, 100)
  }, [])

  React.useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  React.useEffect(() => {
    if (showToast) {
      handleShowToast()
    }
  }, [showToast, handleShowToast])

  // Validate props
  try {
    toastSchema.parse({ children, duration, showToast })
  } catch (error) {
    console.error('Toast validation error:', error)
    return null
  }

  return (
    <ToastPrimitive.Provider swipeDirection="right" duration={duration}>
      <ToastPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        className="bg-white rounded-lg shadow-lg p-4 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:animate-swipeOut border border-gray-200 fixed bottom-4 right-4 w-[380px]"
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">{children}</div>
          <ToastPrimitive.Close
            className="text-gray-400 hover:text-gray-600 rounded-lg p-1 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <XIcon size={16} weight="bold" />
          </ToastPrimitive.Close>
        </div>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport className="fixed bottom-0 right-0 flex flex-col p-4 gap-2 w-[400px] max-w-[100vw] m-0 list-none z-50 outline-none" />
    </ToastPrimitive.Provider>
  )
}

Toast.displayName = 'Toast'

export const ToastProvider = ToastPrimitive.Provider
export const ToastViewport = ToastPrimitive.Viewport
