import React from 'react'
import './panel2.scss'

export interface Panel2Props {
  title?: string
  children?: React.ReactNode
}
export const Panel2: React.FC<Panel2Props> = ({ title, children }) => {
  return (
    <div className="panel2">
      <div className="panel-title">
        <pichincha-typography variant="h2">{title}</pichincha-typography>
      </div>
      {children}
    </div>
  )
}
