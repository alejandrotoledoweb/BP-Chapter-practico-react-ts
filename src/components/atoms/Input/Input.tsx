import { FC, useEffect, useState } from 'react'
import './../../../index.css'

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

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleOnChange = (event: any) => {
    const val = event.target.value
    setValue(val)
    onChange(val)
  }

  const handleFocus = () => {
    setBlurStatus(true)
  }

  return (
    <div className="input-div" style={{ width }}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={`${blurStatus ? 'focus-true' : ''}input`}
        onChange={handleOnChange}
        name={name}
        pattern={pattern}
        required
        onBlur={handleFocus}
        // focus={blurStatus.toString()}
      />
      <span className="input-span">{errorMessage}</span>
    </div>
  )
}
