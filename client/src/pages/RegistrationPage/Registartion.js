import React, { useState, useEffect } from 'react'

import urls from '../../assets/constants/ursl'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'

import './registration.css'

export const Registration = () => {

  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    "name": "", "email": "", "password": '',
  })
  // avatar: null

  useEffect(() => {
    message(error)
    clearError();
  }, [error, message, clearError])

  // const avatarHandler = (event) => {
  //   const file = event.target.files[0];
  //   setForm({ ...form, avatar: file })
  // }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      console.log(form.name)
      // if (form.avatar) {
      //   formData.append('avatar', form.avatar, form.avatar.name)
      // } else {
      //   formData.append('avatar', "")
      // }
      const data = await request(`${urls.API}/users`, 'POST', {"name": form.name, "email": form.email, "password": form.password}, {}, true)
      message(data.message);
    } catch (e) {
    }
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
          </div>
          <div className="card-action">
            <button onClick={registerHandler} disabled={loading} className="btn waves-effect red waves-light" type="submit" name="action">Submit
            <i className="material-icons right">send</i>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}