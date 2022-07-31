import { observer } from 'mobx-react'
import React, { useState } from 'react'
import store from '../../store/Store'
import { Checkbox } from '../atoms/Checkbox/Checkbox'
import { ErrorMessage } from '../atoms/ErrorMessage/ErrorMessage'
import { Input } from '../atoms/Input/Input'
import { Spinner } from '../atoms/Spinner/Spinner'
import { BookCard } from '../molecules/BookCard/BookCard'
import { Panel2 } from '../molecules/Panel2/Panel2'
import './publicaciones.scss'

interface PublicacionesProps {
  jwt: string | null
}

export const Publicaciones: React.FC<PublicacionesProps> = observer(({ jwt }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [values, setValues] = useState({
    filter: '',
    category: 57
  })

  const [checked, setChecked] = useState({
    'Action and adventure': false,
    Tecnology: false,
    'True crime': false,
    Drama: false,
    Crime: false
  })

  const [categories, setCategories] = useState<number[]>([])

  const handleOnChange =
    (property: 'filter' | 'category') => async (value: any, validInput: string) => {
      setValues((current) => ({
        ...current,
        [property]: value
      }))

      setLoading(true)
      if (property === 'filter') {
        try {
          await store.fecthBooks(value, [values.category], jwt)
        } catch (error) {
          console.log(error)
        } finally {
          // setLoading(false)
        }
      }
      if (property === 'category') {
        try {
          await store.fecthBooks(values.filter, [value], jwt)
        } catch (error) {
          console.log(error)
        } finally {
        }
      }
      setLoading(false)
    }

  const addOrRemoveCat = (status: boolean, cat: string) => {
    let catNumber = 0

    switch (cat) {
      case 'Action and adventure':
        catNumber = 1
        break
      case 'Tecnology':
        catNumber = 57
        break
      case 'True Crime':
        catNumber = 56
        break
      case 'Drama':
        catNumber = 10
        break
      case 'Crime':
        catNumber = 9
        break
      default:
        catNumber = 57
    }
    console.log(catNumber)
    const indexUnChecked = categories.indexOf(catNumber)
    if (status) {
      setCategories((current) => [...current, catNumber])
    } else {
      setCategories((current) => current.filter((_, index) => index !== indexUnChecked))
    }
  }

  const handleOnCheckBox =
    (value: 'Action and adventure' | 'Tecnology' | 'True crime' | 'Drama' | 'Crime') =>
    async (status: boolean) => {
      setChecked((current) => ({
        ...current,
        [value]: status
      }))

      addOrRemoveCat(status, value)
      console.log(categories)
    }

  return (
    <div>
      <div className="publicaciones-title">
        <pichincha-typography variant="h2" align="left">
          Publicaciones
        </pichincha-typography>
      </div>
      <div className="publicaciones-books">
        <section className="publicaciones-books__container">
          {loading && <Spinner />}
          {store.books?.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </section>
        <aside className="publicaciones-books__filter">
          <pichincha-typography variant="h4" align="left">
            Filtro
          </pichincha-typography>
          <div>
            <Input
              label="Buscar"
              placeholder="Ej. Angular, React"
              initialValue={values.filter}
              onChange={handleOnChange('filter')}
              name="filtro"
              inputId="filtro"
              errorMessage="Nombre de usuario es requerido"
              pattern="[A-Za-z0-9]{0,20}"
              required={false}
            />
          </div>
          <Panel2 title="Categorías">
            <div className="addbook-container__checkboxs">
              <div>
                <Checkbox
                  onClick={handleOnCheckBox('Action and adventure')}
                  value=" Action and adventure"
                  id="1"
                  disabled={false}
                />
                <Checkbox
                  onClick={handleOnCheckBox('Tecnology')}
                  value="Tecnology"
                  id="57"
                  disabled={false}
                />
                <Checkbox
                  onClick={handleOnCheckBox('True crime')}
                  value="True crime"
                  id="3"
                  disabled={false}
                />
              </div>
              <div>
                <Checkbox
                  onClick={handleOnCheckBox('Drama')}
                  value="Drama"
                  id="4"
                  disabled={false}
                />
                <Checkbox
                  onClick={handleOnCheckBox('Crime')}
                  value="Crime"
                  id="5"
                  disabled={false}
                />
              </div>
            </div>
          </Panel2>
        </aside>
      </div>
    </div>
  )
})
