import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { register } from '../../redux/auth-reducer'

import './registration.scss'
import { LANGUAGE_CONFIG, WORDS_CONFIG } from '../../shared/words-config'

export const Registration = () => {

  const dispatch = useDispatch();
  const language = useSelector((store) => store.settingsStore.activeLanguage)
  const message = useSelector((store) => store.authStore.authMessage)
  const registerSucces = useSelector((store) => store.authStore.registerSucces)
  const [registerMessage, setRegisterMessage] = useState(null)
  const [succesMessage, setSuccesMessage] = useState(null)
  const [form, setForm] = useState({
    name: "", email: "", password: '', avatar: ''
  })

  const isLoading = useSelector(
    (store) => store.authStore.isLoading
  );

  const avatarHandler = (event) => {
    const file = event.target.files[0];
    setForm({ ...form, avatar: file })
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = () => {
    dispatch(register(form.name, form.email, form.password, form.avatar))
  }

  useEffect(() => {
    language === LANGUAGE_CONFIG.foreign ? setRegisterMessage(WORDS_CONFIG.REGISTER_ERROR.foreign) :
      setRegisterMessage(WORDS_CONFIG.REGISTER_ERROR.native)
    language === LANGUAGE_CONFIG.foreign ? setSuccesMessage(WORDS_CONFIG.REGISTER_SUCCES.foreign) :
      setRegisterMessage(WORDS_CONFIG.REGISTER_SUCCES.native)
    if (message) {
      window.M.toast({ html: registerMessage, displayLength: 1000 })
    }
    else if (!message && registerSucces) {
      console.log('hi')
      window.M.toast({ html: succesMessage, displayLength: 1000 })
    }
  }, [message, registerSucces])

  return (
    <div className="row reg_container">
      <div id="sign_up_form" className="col s6 offset-s3">
        <div className="card reg_card">
          <div className="card-content white-text">
            <span className="card-title" style={{ textAlign: 'center' }}>Sign up</span>
          </div>
          <div className="card-inputs">
            <div className="row">
              <div className="input-field col s12">
                <input onChange={changeHandler} name="name" id="name" type="text" placeholder="Enter name" />
                <label htmlFor="name" className="active">Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input onChange={changeHandler} name="email" id="email" type="email" className="validate" placeholder="Enter email" />
                <label htmlFor="email" className="active">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input onChange={changeHandler} name="password" id="password" type="password" className="validate" placeholder="Enter password" />
                <label htmlFor="password" className="active">Password</label>
              </div>
            </div>
            <div className="input-field photo_field">
              <input placeholder="Set your photo "
                accept="image/jpeg"
                id="Photo"
                type="file"
                name="avatar"
                className="card-input"
                onChange={avatarHandler}
              />
            </div>
          </div>
          <div className="sign_in_btn_area">
            <button onClick={registerHandler} disabled={isLoading} className="btn waves-effect red waves-light" type="submit" name="action">Sign up!
            <i className="material-icons right">send</i>
            </button>
          </div>
          <div className="link-block">
            <NavLink className="btn sign_in_button" to="/login">Sign in</NavLink>
          </div>
        </div>

      </div>
    </div>
  )
}