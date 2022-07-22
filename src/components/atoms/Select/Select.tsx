import React, { useEffect, useRef } from 'react'

type SelectItem = {
  value: any
  label: string
  selected?: boolean
}

export const Select = () => {
  const selectRef = useRef<any>()
  useEffect(() => {
    const items = [
      { label: 'AppVengers', value: '1' },
      { label: 'Marketinators', value: '2' },
      { label: 'Ducats', value: '3' },
      { label: 'deUna!', value: '4' }
    ]
    // const pichincha_select = document.querySelector('pichincha-select')
    selectRef.current.items = items // sets the items to the select
    selectRef.current?.addEventListener('clickedItem', (e: any) => {
      console.log('select emits', e.detail.value) // e.detail has the value selected
    })
  }, [])
  return (
    <div>
      <pichincha-select
        ref={selectRef}
        id-element="selectPichincha"
        placeholder="Selecciona una app ..."
      />
    </div>
  )
}
