import React from 'react'

export interface CheckboxProps {
  value?: string

  onClick?: () => void
  children?: React.ReactNode
}

export const Checkbox: React.FC<CheckboxProps> = ({ value }) => {
  return <pichincha-checkbox value={value}></pichincha-checkbox>
}
