'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { isFileInArray } from '@/lib/utils'
import { ArrowUp, Paperclip, Square, X } from 'lucide-react'
import { SetStateAction, useEffect, useMemo, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

export function ChatInput({
  retry,
  isErrored,
  errorMessage,
  isLoading,
  isRateLimited,
  stop,
  input,
  handleInputChange,
  handleSubmit,
  isMultiModal,
  files,
  handleFileChange,
  children,
}: {
  retry: () => void
  isErrored: boolean
  errorMessage: string
  isLoading: boolean
  isRateLimited: boolean
  stop: () => void
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isMultiModal: boolean
  files: File[]
  handleFileChange: (change: SetStateAction<File[]>) => void
  children: React.ReactNode
}) {
  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    handleFileChange((prev) => {
      const newFiles = Array.from(e.target.files || [])
      const uniqueFiles = newFiles.filter((file) => !isFileInArray(file, prev))
      return [...prev, ...uniqueFiles]
    })
  }

  function handleFileRemove(file: File) {
    handleFileChange((prev) => prev.filter((f) => f !== file))
  }

  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const items = Array.from(e.clipboardData.items)

    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        e.preventDefault()

        const file = item.getAsFile()
        if (file) {
          handleFileChange((prev) => {
            if (!isFileInArray(file, prev)) {
              return [...prev, file]
            }
            return prev
          })
        }
      }
    }
  }

  const [dragActive, setDragActive] = useState(false)

  function handleDrag(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/'),
    )

    if (droppedFiles.length > 0) {
      handleFileChange((prev) => {
        const uniqueFiles = droppedFiles.filter(
          (file) => !isFileInArray(file, prev),
        )
        return [...prev, ...uniqueFiles]
      })
    }
  }

  const filePreview = useMemo(() => {
    if (files.length === 0) return null
    return Array.from(files).map((file) => {
      return (
        <div className="relative" key={file.name}>
          <span
            onClick={() => handleFileRemove(file)}
            className="absolute -top-2 -right-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1 cursor-pointer"
          >
            <X className="h-3 w-3" />
          </span>
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="rounded-lg w-10 h-10 object-cover border"
          />
        </div>
      )
    })
  }, [files])

  function onEnter(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      if (e.currentTarget.checkValidity()) {
        handleSubmit(e)
      } else {
        e.currentTarget.reportValidity()
      }
    }
  }

  useEffect(() => {
    if (!isMultiModal) {
      handleFileChange([])
    }
  }, [isMultiModal])

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={onEnter}
      className="mb-4 mt-auto flex flex-col bg-background"
      onDragEnter={isMultiModal ? handleDrag : undefined}
      onDragLeave={isMultiModal ? handleDrag : undefined}
      onDragOver={isMultiModal ? handleDrag : undefined}
      onDrop={isMultiModal ? handleDrop : undefined}
    >
      {isErrored && (
        <div
          className={`flex items-center p-3 text-sm font-medium mx-4 mb-4 rounded-lg ${
            isRateLimited
              ? 'bg-orange-50 text-orange-700 border border-orange-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          <span className="flex-1">{errorMessage}</span>
          <button
            className={`px-3 py-1 rounded-md text-xs font-medium ${
              isRateLimited 
                ? 'bg-orange-100 hover:bg-orange-200 text-orange-700' 
                : 'bg-red-100 hover:bg-red-200 text-red-700'
            }`}
            onClick={retry}
          >
            Try again
          </button>
        </div>
      )}
      
      <div className="relative mx-4">
        <div
          className={`border rounded-xl bg-white dark:bg-gray-950 shadow-sm transition-all ${
            dragActive
              ? 'border-blue-300 dark:border-blue-700 shadow-md'
              : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
          }`}
        >
          {/* Settings row */}
          <div className="flex items-center px-3 py-2 border-b border-gray-100 dark:border-gray-800">
            {children}
          </div>
          
          {/* Input area */}
          <div className="flex items-end p-3 gap-2">
            <div className="flex-1">
              <TextareaAutosize
                autoFocus={true}
                minRows={1}
                maxRows={6}
                className="w-full resize-none bg-transparent text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 border-0 outline-none focus:ring-0"
                required={true}
                placeholder="Ask me about your store performance, camera feeds, inventory, or any retail question..."
                disabled={isErrored}
                value={input}
                onChange={handleInputChange}
                onPaste={isMultiModal ? handlePaste : undefined}
              />
              
              {/* File previews */}
              {files.length > 0 && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  {filePreview}
                </div>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <input
                type="file"
                id="multimodal"
                name="multimodal"
                accept="image/*"
                multiple={true}
                className="hidden"
                onChange={handleFileInput}
              />
              
              {isMultiModal && (
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Button
                        disabled={!isMultiModal || isErrored}
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        onClick={(e) => {
                          e.preventDefault()
                          document.getElementById('multimodal')?.click()
                        }}
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add attachments</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              {!isLoading ? (
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Button
                        disabled={isErrored || !input.trim()}
                        variant="default"
                        size="sm"
                        type="submit"
                        className="h-8 w-8 p-0 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Send message</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.preventDefault()
                          stop()
                        }}
                      >
                        <Square className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Stop generation</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}