'use client'

import useDebouncedCallback from '@/hooks/utils'
import { upload } from '@vercel/blob/client'
import { useCompletion } from 'ai/react'
import { TextArea } from 'polarkit/components/ui/atoms'
import {
  ChangeEventHandler,
  ClipboardEvent,
  DragEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { twMerge } from 'tailwind-merge'

const uploadingText = 'Uploading...'

interface MarkdownEditorProps {
  className?: string
  value: string
  onChange?: (value: string) => void
  autoFocus?: boolean
}

export const MarkdownEditor = ({
  value,
  className,
  onChange,
  autoFocus,
}: MarkdownEditorProps) => {
  const [completion, setCompletion] = useState<string>()
  const ref = useRef<HTMLTextAreaElement>(null)
  const { complete } = useCompletion({
    onFinish: (prompt, completion) => setCompletion(completion),
  })

  useEffect(() => {
    if (ref.current) {
      const text = `\n\n${completion}`
      insertTextAtCursor(text, ref.current)
      onChange?.(ref.current.value)
      console.log(completion)
    }
  }, [completion])

  const insertTextAtCursor = useCallback(
    (text: string, element: HTMLTextAreaElement) => {
      const cursorPosition = element.selectionStart

      const textBeforeCursorPosition = element.value.substring(
        0,
        cursorPosition,
      )
      const textAfterCursorPosition = element.value.substring(
        cursorPosition,
        element.value.length,
      )

      element.value = textBeforeCursorPosition + text + textAfterCursorPosition

      element.selectionStart = cursorPosition + text.length
      element.selectionEnd = cursorPosition + text.length
    },
    [],
  )

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
  }, [value])

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      onChange?.(e.target.value)
    },
    [onChange],
  )

  const handleDrag: DragEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop: DragEventHandler<HTMLTextAreaElement> = useCallback(
    async (e) => {
      if (e.target instanceof HTMLTextAreaElement) {
        e.preventDefault()
        e.stopPropagation()

        for (const file of e.dataTransfer.files) {
          try {
            insertTextAtCursor(uploadingText, e.target)

            const newBlob = await upload(file.name, file, {
              access: 'public',
              handleUploadUrl: '/api/blob/upload',
            })

            const textToInsert = `![${newBlob.pathname}](${newBlob.url})`

            e.target.value = e.target.value.replace(uploadingText, textToInsert)
          } catch (err) {
            e.target.value = e.target.value.replace(uploadingText, '')
          } finally {
            onChange?.(e.target.value)
          }
        }
      }
    },
    [onChange, insertTextAtCursor],
  )

  const handlePaste = useCallback(
    async (e: ClipboardEvent<HTMLTextAreaElement>) => {
      if (e.target instanceof HTMLTextAreaElement) {
        if (e.clipboardData.files.length > 0) {
          e.preventDefault()
          e.stopPropagation()
        }

        for (const file of e.clipboardData.files) {
          try {
            insertTextAtCursor(uploadingText, e.target)

            const newBlob = await upload(file.name, file, {
              access: 'public',
              handleUploadUrl: '/api/blob/upload',
            })

            const textToInsert = `![${newBlob.pathname}](${newBlob.url})`

            e.target.value = e.target.value.replace(uploadingText, textToInsert)
          } catch (err) {
            e.target.value = e.target.value.replace(uploadingText, '')
          } finally {
            onChange?.(e.target.value)
          }
        }
      }
    },
    [onChange, insertTextAtCursor],
  )

  const fire = useDebouncedCallback(
    (element: HTMLTextAreaElement) => {
      if (element instanceof HTMLTextAreaElement) {
        const reg = new RegExp(/(\/\/\s.)(.*)/g)
        const match = reg.exec(element.value)

        if (match?.[0]) {
          const prompt = match[0].replace('// ', '')
          complete(prompt)
        }
      }
    },
    1000,
    [complete],
  )

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      /** Handle tab presses */
      if (e.key == 'Tab' && e.target instanceof HTMLTextAreaElement) {
        e.preventDefault()
        insertTextAtCursor('\t', e.target)
        onChange?.(e.target.value)
      }

      fire(e.target)
    },
    [onChange, insertTextAtCursor, complete],
  )

  const allow: DragEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  return (
    <TextArea
      ref={ref}
      className={twMerge(
        'h-screen min-h-screen rounded-3xl p-6 text-lg',
        className,
      )}
      placeholder="# Hello World!"
      resizable={false}
      value={value}
      onChange={handleChange}
      onDrop={handleDrop}
      onDrag={handleDrag}
      onDragOver={allow}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      autoFocus={autoFocus}
    />
  )
}
