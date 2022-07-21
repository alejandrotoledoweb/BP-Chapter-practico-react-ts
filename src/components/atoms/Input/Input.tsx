import { FC, useEffect, useRef, useState } from 'react'

export interface InputProps {
  initialValue?: string
  placeholder?: string
  width?: string
  type?: string
  onChange?(value: any): void
  name?: string
  inputId?: string
  label?: string
  pattern?: string
  errorMessage?: string
  required?: boolean
}

export const Input: FC<InputProps> = ({
  initialValue = '',
  type = 'text',
  placeholder,
  width,
  onChange = () => {},
  name,
  label,
  pattern,
  errorMessage
}) => {
  const [value, setValue] = useState(initialValue)
  const [blurStatus, setBlurStatus] = useState(false)

  const [valid, setValid] = useState<'disabled' | 'error' | 'normal' | 'success'>('normal')
  // disabled
  // error
  // normal
  // success

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleOnChange = (event: any) => {
    const val = event.detail
    console.log(event.detail)
    const regex = new RegExp(`${pattern}`)
    if (regex.test(val)) {
      setValid('success')
    } else {
      setValid('error')
    }
    setValue(val)
    onChange(val)
  }

  const handleFocus = () => {
    setBlurStatus(true)
  }

  const inputRef = useRef<any>()

  useEffect(() => {
    inputRef.current?.addEventListener('eventValue', handleOnChange)
    return () => {
      inputRef.current?.removeEventListener('eventValue', handleOnChange)
    }
  })

  return (
    <pichincha-input
      type={type}
      placeholder={placeholder}
      value={value}
      ref={inputRef}
      control-event={true}
      pattern={pattern}
      state={valid}
      error-helper={errorMessage}
      normal-helper={''}
      show-icon-status={true}
      full-width="true"
    ></pichincha-input>
  )
}
