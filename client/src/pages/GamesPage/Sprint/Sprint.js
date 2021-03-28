import React, { useState } from 'react'
import { SprintGame } from './components/Sprint/SprintGame'
import { SprintRules } from './components/SprintRules/SprintRules'

export const Sprint = () => {
  const [isGameStarted, setIsGameStarted] = useState(false)
  return (
  <div className="game-block">
    {!isGameStarted ? 
      <SprintRules setGameStarted={setIsGameStarted} isGameStarted={isGameStarted} /> :
      <SprintGame />
    }
  </div>
  )
}