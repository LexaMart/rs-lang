import React from 'react'

import './score.scss'

export const Score = ({score}) => {
  return (
    <div className="score-block">
      {score}
    </div>
  )
}