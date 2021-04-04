import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { login } from '../../redux/auth-reducer'

import './auth.css'

export const Auth = () => {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    "email": "", "password": '',
  })

  const isLoading = useSelector(
    (store) => store.authStore.isLoading
  );

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = () => {
    dispatch(login(form.email, form.password));
  }
  return (
    <div className="row auth_container">
      <div className="col s6 offset-s3">
        <div className="card auth_card">
          <div className="card-content white-text">
            <span className="card-title" style={{ textAlign: 'center' }}>Sign in</span>
          </div>
          <div className="card-inputs">
            <div className="row">
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
          </div>
          <div className="sign_in_btn_area">
            <button onClick={loginHandler} disabled={isLoading} className="btn waves-effect red waves-light" type="submit" name="action">Sign in!
            <i className="material-icons right">send</i>
            </button>
          </div>
          <div className="link-block">
            <NavLink className="btn sign_in_button" to="/registration">Sign Up</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
