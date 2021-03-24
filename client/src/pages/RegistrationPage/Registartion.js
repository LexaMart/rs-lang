import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useMessage } from '../../hooks/message.hook'
import { register } from '../../redux/auth-reducer'

import './registration.css'

export const Registration = () => {

  const dispatch = useDispatch();
  const message = useMessage();
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


  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 className="form-title">
          Registartion
        </h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title" style={{ textAlign: 'center' }}>Sign up</span>
          </div>
          <div className="card-inputs">
            <div className="row">
              <div className="input-field col s12">
                <input onChange={changeHandler} name="name" id="name" type="text" placeholder="Enter name" />
                <label htmlFor="name">Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input onChange={changeHandler} name="email" id="email" type="email" className="validate" placeholder="Enter email" />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input onChange={changeHandler} name="password" id="password" type="password" className="validate" placeholder="Enter password" />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="input-field">
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
          <div className="card-action">
            <button onClick={registerHandler} disabled={isLoading} className="btn waves-effect red waves-light" type="submit" name="action">Sign up!
            <i className="material-icons right">send</i>
            </button>
          </div>
          <div className="link-block">
            <NavLink className="auth-link" to="/login">Sign in</NavLink>
          </div>
        </div>

      </div>
    </div>
  )
}