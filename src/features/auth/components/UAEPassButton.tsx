import { Button } from '../../../shared/components/ui'

interface UAEPassButtonProps {
  onClick: () => void
  size?: 'sm' | 'base' | 'lg'
}

export function UAEPassButton({ onClick, size = 'base' }: UAEPassButtonProps) {
  return (
    <Button
      variant="solid"
      style="secondary"
      size={size}
      onClick={onClick}
      className="w-full"
    >
      <svg
        width="26"
        height="25"
        viewBox="0 0 26 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <path
          d="M13 0L15.708 9.292L25 12L15.708 14.708L13 24L10.292 14.708L1 12L10.292 9.292L13 0Z"
          fill="currentColor"
        />
      </svg>
      Sign in with UAE Pass
    </Button>
  )
}
