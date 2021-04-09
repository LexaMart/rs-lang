import React from 'react'

import './score.scss'

export const removeGameClasses = () => {
  const scoreBlock = document.querySelector('.score-block')
  scoreBlock.classList.remove('incorrect-score')
  scoreBlock.classList.remove('right-score')
}

export const scoreHandler = (answer) => {
  const scoreBlock = document.querySelector('.score-block')
  if (answer) {
    scoreBlock.classList.remove('incorrect-score')
    scoreBlock.classList.add('right-score')
  } else {
    scoreBlock.classList.add('incorrect-score')
    scoreBlock.classList.remove('right-score')
  }
}

export const Score = ({ score }) => {
  return (
    <div className="score-block">
      {score}
    </div>
  )
}