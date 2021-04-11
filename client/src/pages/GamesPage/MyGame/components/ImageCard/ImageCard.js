import React, { useState } from 'react'
import urls from '../../../../../assets/constants/ursl'
import '../../myGame.scss'

export const ImageCard = ({ choiceHandler, key, el }) => {
  const [active, setActive] = useState(true)

  const imageClick = (el) => {
    if (active) {
      choiceHandler(el)
      setActive(false)
    }
  }
  return (
    <div onClick={(el) => imageClick(el)} className={`my-game-word-image ${active ? "" : 'choosen'}`} key={key}>
      <img src={`${urls.API}/${el.image}`} alt="word_image" />
    </div>
  )
}