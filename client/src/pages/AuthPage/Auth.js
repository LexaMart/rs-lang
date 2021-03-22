import React, { useState, useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import urls from '../../assets/constants/ursl'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import { login } from '../../redux/auth-reducer'

import './auth.css'

export const Auth = () => {
  const auth = useContext(AuthContext)
  const dispatch = useDispatch()
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    "email": "", "password": '',
  })

  useEffect(() => {
    message(error)
    clearError();
  }, [error, message, clearError])


  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    try {
      await login(form.email, form.password)(dispatch);
      // const data = await request(`${urls.API}/signin`, 'POST', { "email": form.email, "password": form.password }, {}, true)
      // auth.login(data.token, data.refreshToken, data.userId)
      // // setAcive(!active)
      // console.log(data)
    } catch (e) { }
  }
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 className="form-title">
          Authentication
        </h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title" style={{ textAlign: 'center' }}>Sign in</span>
          </div>
          <div className="card-inputs">
            <div className="row">
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
          </div>
          <div className="card-action">
            <button onClick={loginHandler} disabled={loading} className="btn waves-effect red waves-light" type="submit" name="action">Sign in!
            <i className="material-icons right">send</i>
            </button>
          </div>
          <div className="link-block">
            <NavLink className="auth-link" to="/registration">Sign Up</NavLink>
          </div>
        </div>

      </div>
    </div>
  )
}
