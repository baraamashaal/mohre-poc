import * as React from 'react'
import { UploadSimpleIcon, XIcon,  FileIcon } from '@phosphor-icons/react'
import { cn } from '../../../lib/utils'

export interface FileUploadProps {
  label?: string
  helperText?: string
  error?: boolean
  errorMessage?: string
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  onFilesChange?: (files: File[]) => void
  className?: string
  disabled?: boolean
}

export function FileUpload({
  label,
  helperText,
  error,
  errorMessage,
  accept,
  multiple = false,
  maxSize,
  onFilesChange,
  className,
  disabled,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<File[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const fileUploadId = React.useId()

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return

    const fileArray = Array.from(newFiles)

    // Filter by maxSize if specified
    const validFiles = maxSize
      ? fileArray.filter((file) => file.size <= maxSize)
      : fileArray

    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles

    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    const size = sizes[i] ?? 'Bytes'
    return `${String(Math.round((bytes / Math.pow(k, i)) * 100) / 100)} ${size}`
  }

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {label && (
        <label htmlFor={fileUploadId} className="text-sm font-medium text-gray-900">
          {label}
        </label>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors',
          isDragging && 'border-primary-500 bg-primary-50',
          error && 'border-red-500 bg-red-50',
          !isDragging && !error && 'border-gray-300 hover:border-gray-400',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <input
          ref={inputRef}
          id={fileUploadId}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="sr-only"
        />

        <UploadSimpleIcon className="h-10 w-10 text-gray-400 mb-2" weight="regular" />

        <button
          type="button"
          onClick={() => {
            inputRef.current?.click()
          }}
          disabled={disabled}
          className="text-sm font-medium text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:pointer-events-none"
        >
          Choose {multiple ? 'files' : 'file'}
        </button>

        <p className="mt-1 text-xs text-gray-500">or drag and drop</p>

        {maxSize && (
          <p className="mt-1 text-xs text-gray-400">
            Max file size: {formatFileSize(maxSize)}
          </p>
        )}
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-2 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-3"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <FileIcon className="h-5 w-5 text-gray-400 flex-shrink-0" weight="fill" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  removeFile(index)
                }}
                className="flex-shrink-0 ml-2 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label={`Remove ${file.name}`}
              >
                <XIcon className="h-5 w-5 text-gray-500" weight="bold" />
              </button>
            </div>
          ))}
        </div>
      )}

      {helperText && !error && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}

      {error && errorMessage && (
        <p className="text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  )
}
