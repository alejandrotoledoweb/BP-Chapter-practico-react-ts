import React, { useEffect, useRef, useState } from 'react'
import { items } from '../../constantes/SelectOptions'

// type SelectItem = {
//   value: any
//   label: string
//   selected?: boolean
// }
type SelectItemProps = {
  onChange?(value: any, value2: any): void
}

export const Select: React.FC<SelectItemProps> = ({ onChange = () => {} }) => {
  const selectRef = useRef<any>()
  // const items = [
  //   { label: 'AppVengers', value: '1' },
  //   { label: 'Marketinators', value: '2' },
  //   { label: 'Ducats', value: '3' },
  //   { label: 'deUna!', value: '4' }
  // ]
  const [value, setValue] = useState('')

  useEffect(() => {
    onChange(value, 'normal')
  }, [value])

  const handleOnChange = (event: any) => {
    const val = event.detail.value

    setValue(val)
  }

  useEffect(() => {
    selectRef.current.items = items // sets the items to the select
    // const pichincha_select = document.querySelector('pichincha-select')
    selectRef.current?.addEventListener('clickedItem', (e: any) => {
      handleOnChange(e)
      // console.log('select emits', e.detail.value) // e.detail has the value selected
    })

    return () => {
      selectRef.current?.removeEventListener('clickedItem', (e: any) => {
        // console.log('select emits', e.detail.value) // e.detail has the value selected
      })
    }
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
