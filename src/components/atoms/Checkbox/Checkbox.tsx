import React, { useEffect, useRef, useState } from 'react'

export interface CheckboxProps {
  value?: string
  onClick?(value: any): void
  id: string | number
  disabled: boolean
  children?: React.ReactNode
}

export const Checkbox: React.FC<CheckboxProps> = ({ value, id, disabled, onClick = () => {} }) => {
  const checkboxRef = useRef<any>()
  const [checked, setChecked] = useState<boolean>(false)

  const handleClick = (event: any) => {
    // console.log(event.detail.value)
    setChecked(!checked)
    onClick(!checked)
  }

  useEffect(() => {
    checkboxRef.current.addEventListener('clickCheck', handleClick)
    return () => {
      checkboxRef.current.removeEventListener('clickCheck', handleClick)
    }
  })
  return (
    <div className="checkbox">
      <pichincha-check-box id-element={id} disabled={disabled} value={value} ref={checkboxRef}>
        <pichincha-typography variant="bodyText">{value}</pichincha-typography>
      </pichincha-check-box>
    </div>
  )
}
