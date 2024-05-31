import { useState } from 'react'

interface ScoreProps {
    attack: number;
  }

export default function Score({ attack }: ScoreProps) {
    const [lifePoint, setLifePoint] = useState(20);

    const calculFight = () => {
      setLifePoint(lifePoint - attack);
    }

  return (
    <div>
        <h1>Life</h1>
        <p>Life: {lifePoint}</p>
        <h1>Attack</h1>
        <p>Attack: {attack}</p>
        <button onClick={calculFight} style={{ background: 'grey' }}>Attack</button>
    </div>
  )
}
