import React, { useEffect } from 'react'

type SelectItem = {
  value: any
  label: string
  selected?: boolean
}

export const Select = () => {
  useEffect(() => {
    const items = [
      { label: 'AppVengers', value: '1' },
      { label: 'Marketinators', value: '2' },
      { label: 'Ducats', value: '3' },
      { label: 'deUna!', value: '4' }
    ]
    const pichincha_select = document.querySelector('pichincha-select')
    pichincha_select.items = items // sets the items to the select
    pichincha_select.addEventListener('clickedItem', (e) => {
      console.log('select emits', e.current.detail) // e.detail has the value selected
    })
  }, [])
  return (
    <div>
      <pichincha-select id-element="selectPichincha" placeholder="Selecciona una app ..." />
    </div>
  )
}
