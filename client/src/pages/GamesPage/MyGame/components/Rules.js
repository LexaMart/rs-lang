import React from 'react'

export const Rules = ({startGame}) =>  {
  return (
  <div className="rules-block">
          <p className="rules">
            In this mini-game you should guess what picture describes the following word
             </p>
          <button onClick={() => startGame()} className="btn waves-effect waves-light red" type="button" name="action">START
          </button>
        </div>
  )
}