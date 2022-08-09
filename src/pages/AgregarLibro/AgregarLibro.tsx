import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/atoms/Button/Button'
import { Checkbox } from '../../components/atoms/Checkbox/Checkbox'
import { ErrorMessage } from '../../components/atoms/ErrorMessage/ErrorMessage'
import { Input } from '../../components/atoms/Input/Input'
import { Panel2 } from '../../components/molecules/Panel2/Panel2'
import store from '../../store/Store'
import './AgregarLibro.scss'

const AgregarLibro: React.FC = () => {
  const [checked, setChecked] = useState({
    'Action and adventure': false,
    Tecnology: false,
    'True crime': false,
    Drama: false,
    Crime: false
  })

  const [totalChecked, setTotalChecked] = useState(0)
  const [catgeories, setCategories] = useState<number[]>([])
  const [publicLibro, setPublicLibro] = useState<boolean>(false)
  const [info, setInfo] = useState({})
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [valid1, setValid1] = useState(false)
  const [valid2, setValid2] = useState(false)

  useEffect(() => {
    if (totalChecked >= 3) {
      setValid2(true)
    } else {
      setValid2(false)
    }
  }, [catgeories])

  const [values, setValues] = useState({
    title: '',
    url: '',
    resumen: '',
    image: '',
    author: ''
  })
  useEffect(() => {
    const areTruly = Object.values(info).every((value) => value === true)
    setValid1(areTruly)
  }, [info])

  useEffect(() => {
    if (store.editableBook) {
      setCategories(store.editableBook.category)
      setValues((current) => ({
        ...current,
        title: store.editableBook.title,
        url: store.editableBook.url,
        resumen: store.editableBook.resume,
        image: store.editableBook.image,
        author: store.editableBook.author
      }))
    }

    return () => {
      setValues((current) => ({
        ...current,
        title: '',
        url: '',
        resumen: '',
        image: '',
        author: ''
      }))
      setCategories([])
    }
  }, [])

  const addOrRemoveOne = (status: boolean) => {
    if (status) {
      return 1
    } else {
      return -1
    }
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
    const indexUnChecked = catgeories.indexOf(catNumber)
    if (status) {
      setCategories((current) => [...current, catNumber])
    } else {
      setCategories((current) => current.filter((_, index) => index !== indexUnChecked))
    }
  }

  const handleOnChange =
    (property: 'title' | 'url' | 'resumen' | 'image' | 'author') =>
    async (value: string, validInput: string) => {
      setValues((current) => ({
        ...current,
        [property]: value
      }))
      if (validInput === 'normal' || validInput === 'error' || validInput === 'disabled') {
        setInfo((current) => ({
          ...current,
          [property]: false
        }))
      }
      if (validInput === 'success') {
        setInfo((current) => ({
          ...current,
          [property]: true
        }))
      }
    }

  const handleOnCheckBox =
    (value: 'Action and adventure' | 'Tecnology' | 'True crime' | 'Drama' | 'Crime') =>
    async (status: boolean) => {
      setChecked((current) => ({
        ...current,
        [value]: status
      }))

      setTotalChecked(totalChecked + addOrRemoveOne(status))
      addOrRemoveCat(status, value)
    }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const body = {
        title: values.title,
        auhtor: values.author,
        resume: values.resumen,
        image: values.image,
        url: values.url,
        catergory: catgeories,
        public: true
      }
      const register = await axios.post('https://cangular-api.herokuapp.com/books/owner', body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${store.currentUserJWT}`
        }
      })
      const data = await register.data
      if (data.status == true) {
        navigate('/books')
      }
    } catch (error) {
      console.log({ error })
    } finally {
      setLoading(false)
    }
  }

  const editBookSubmit = () => {
    console.log('editableBook')
  }
  return (
    <div>
      <div className="addbook-top">
        <pichincha-typography variant="h3">Biblioteca</pichincha-typography>
        <pichincha-typography variant="bodyText">{store.currentUserName}</pichincha-typography>
      </div>
      <div className="addbook-title">
        <pichincha-typography variant="h2" weight="bold">
          Registro Libro
        </pichincha-typography>
      </div>
      <div className="addbook-container">
        <div className="addbook-container__panel">
          <section className="">
            <Input
              label="Nombre de Libro"
              placeholder="Ej. Angular, NRGX"
              initialValue={values.title}
              onChange={handleOnChange('title')}
              name="nombre de libro"
              inputId="nombre de libro"
              errorMessage="Nombre de libro es requerido"
              pattern="[A-Za-z0-9]{4,20}"
              required={true}
            />
            <Input
              label="URL del libro"
              placeholder="Ej. https://books-all.com"
              initialValue={values.url}
              onChange={handleOnChange('url')}
              name="url del libro"
              inputId="url del libro"
              errorMessage="URL de libro es requerido"
              pattern="[A-Za-z0-9]{4,20}"
              required={true}
            />
            <Input
              label="Resumen del libro"
              placeholder="Ej. ..."
              initialValue={values.resumen}
              onChange={handleOnChange('resumen')}
              name="resumen de libro"
              inputId="resumen de libro"
              errorMessage="Resumen de libro es requerido"
              pattern="[A-Za-z0-9]{4,80}"
              required={true}
            />
          </section>
          <section>
            <Input
              label="Nombre del autor"
              placeholder="Ej. Isabel Allende"
              initialValue={values.author}
              onChange={handleOnChange('author')}
              name="nombre del autor"
              inputId="nombre del autor"
              errorMessage="Autor de libro es requerido"
              pattern="[A-Za-z0-9]{4,80}"
              required={true}
            />
            <Input
              label="Imagen de portada"
              placeholder="Ej. https://books-all.com/imagen"
              initialValue={values.image}
              onChange={handleOnChange('image')}
              name="imagen de portada"
              inputId="imagen de portada"
              errorMessage="Imagen de portada es requerido"
              pattern="[A-Za-z0-9]{4,80}"
              required={true}
            />
          </section>
        </div>
        <section className="addbook-container__cat">
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
            {totalChecked < 3 && <ErrorMessage>Elige por lo menos 3 categorías</ErrorMessage>}
          </Panel2>
        </section>
        <div className="addbook-container__footer">
          <Link to="/books">
            <Button color="secondary">Cancelar</Button>
          </Link>

          {store.editableBook.id === '' && (
            <Button
              onClick={handleSubmit}
              loading={loading}
              disabled={valid2 && valid1 ? false : true}
            >
              Registrar
            </Button>
          )}
          {store.editableBook.id !== '' && (
            <Button
              onClick={handleSubmit}
              loading={loading}
              disabled={valid2 && valid1 ? false : true}
            >
              Actualizar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AgregarLibro
