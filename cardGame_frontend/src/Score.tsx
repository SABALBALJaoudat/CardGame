import React from 'react'

interface ScoreProps {
    attack: number;
  }

export default function Score({ attack }: ScoreProps) {
    const lifePoint = 20;

  return (
    <div>
        <h1>Life</h1>
        <p>Life: {lifePoint}</p>
        <h1>Attack</h1>
        <p>Attack: {attack}</p>
    </div>
  )
}
