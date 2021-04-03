import React from 'react'
import { useSelector } from 'react-redux'
import { RS_LANG_API } from '../../../../services/rs-lang-api'
import './userInfo.scss'

export const UserInfo = () => {
  const userName = useSelector((store) => store.authStore.userData.name)
  const avatar = useSelector((store) => store.authStore.userData.avatar)
  
  return (
    <div className="user-block">
      <p className="user-name">{userName}</p>
      <div className='image-handler'>
        <img className="avatar" alt="avatar" src={`${RS_LANG_API}${avatar}`} />
      </div>
    </div>
  )
}