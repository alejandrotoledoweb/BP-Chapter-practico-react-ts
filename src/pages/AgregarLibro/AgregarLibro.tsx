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
    Anime: false,
    'Ciencia Ficción': false,
    Novelas: false,
    Drama: false,
    'Inteligencia Artificial': false
  })

  const [totalChecked, setTotalChecked] = useState(0)
  const [catgeories, setCategories] = useState<string[]>([])
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

  useEffect(() => {
    const areTruly = Object.values(info).every((value) => value === true)
    setValid1(areTruly)
  }, [info])

  const [values, setValues] = useState({
    title: '',
    url: '',
    resumen: '',
    image: '',
    author: ''
  })

  const addOrRemoveOne = (status: boolean) => {
    if (status) {
      return 1
    } else {
      return -1
    }
  }

  const addOrRemoveCat = (status: boolean, cat: string) => {
    const indexUnChecked = catgeories.indexOf(cat)
    if (status) {
      setCategories((current) => [...current, cat])
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
    (value: 'Anime' | 'Ciencia Ficción' | 'Novelas' | 'Drama' | 'Inteligencia Artificial') =>
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
        url: values.url,
        resumen: values.resumen,
        auhtor: values.author,
        image: values.image,
        catergory: catgeories
      }
      console.log({ body })
      const register = await axios.post('https://cangular-api.herokuapp.com/users/', body)
      const data = await register.data
      console.log(data)
      if (data.status === 'success') {
        store.saveId(data.id)
        navigate('/login')
      }
    } catch (error) {
      console.log({ error })
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <div className="top-books">
        <pichincha-typography variant="h3">Biblioteca</pichincha-typography>
        <pichincha-typography variant="bodyText">{store.currentUserName}</pichincha-typography>
      </div>
      <div className="addbook-title">
        <pichincha-typography variant="h2">Registro Libro</pichincha-typography>
      </div>
      <div className="addbook-panel">
        <section className="addbook-2">
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
      <section className="addbook-cat">
        <Panel2 title="Categorías">
          <Checkbox onClick={handleOnCheckBox('Anime')} value="Anime" id="1" disabled={false} />
          <Checkbox
            onClick={handleOnCheckBox('Ciencia Ficción')}
            value="Ciencia Ficción"
            id="1"
            disabled={false}
          />
          <Checkbox onClick={handleOnCheckBox('Novelas')} value="Novelas" id="1" disabled={false} />
          <Checkbox onClick={handleOnCheckBox('Drama')} value="Drama" id="1" disabled={false} />
          <Checkbox
            onClick={handleOnCheckBox('Inteligencia Artificial')}
            value="Inteligencia Artificial"
            id="1"
            disabled={false}
          />
          {totalChecked < 3 && <ErrorMessage>Elige por lo menos 3 categorías</ErrorMessage>}
        </Panel2>
      </section>
      <div className="addbook-footer">
        <Link to="/books">
          <Button color="secondary">Cancelar</Button>
        </Link>

        <Button onClick={handleSubmit} loading={loading} disabled={valid2 && valid1 ? false : true}>
          Registrar
        </Button>
      </div>
    </div>
  )
}

export default AgregarLibro
