import React from 'react'

interface ErrorMessageProps {
  color?: string
  children: React.ReactNode
  variant?: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  variant = 'actionSmall',
  color = 'danger'
}) => {
  return (
    <div className="error-message">
      <pichincha-typography variant={variant} color={color}>
        {children}
      </pichincha-typography>
    </div>
  )
}
