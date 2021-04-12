import React from 'react'
import { useSelector } from 'react-redux'
import './userInfo.scss'

export const UserInfo = () => {
  const userName = useSelector((store) => store.authStore.userData.name)
  const avatar = useSelector((store) => store.authStore.userData.avatar)
  
  return (
    <div className="user-block card">
      <p className="user-name">{userName}</p>
      <div className='image-handler'>
        <img className="avatar" alt="avatar" src={`${avatar}`} />
      </div>
    </div>
  )
}