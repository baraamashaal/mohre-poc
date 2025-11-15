import * as React from 'react'

interface WindowSize {
  width: number
  height: number
  isMobile: boolean
}

export const useWindowSize = (mobileBreakpoint = 1024): WindowSize => {
  const [windowSize, setWindowSize] = React.useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : mobileBreakpoint,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < mobileBreakpoint : false,
  })

  React.useEffect(() => {
    const handleResize = () => {
      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < mobileBreakpoint,
      }
      setWindowSize(newSize)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [mobileBreakpoint])

  return windowSize
}
