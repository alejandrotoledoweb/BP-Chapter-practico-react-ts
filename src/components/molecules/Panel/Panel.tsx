import React from 'react'
import './panel.scss'

export interface PanelProps {
  title?: string
  children?: React.ReactNode
}
export const Panel: React.FC<PanelProps> = ({ title, children }) => {
  return (
    <div className="panel">
      <div className="panel-title">
        <pichincha-typography variant="h1">{title}</pichincha-typography>
      </div>
      {children}
    </div>
  )
}

export default Panel
