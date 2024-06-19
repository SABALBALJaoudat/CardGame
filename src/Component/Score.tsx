import { useState } from 'react'

interface ScoreProps {
    attack_J1: number;
    attack_J2: number;
    shuffleHand: () => void;
  }

export default function Score({ attack_J1, attack_J2, shuffleHand }: ScoreProps) {
    const [lifePoint_J1, setLifePoint_J1] = useState(100);
    const [lifePoint_J2, setLifePoint_J2] = useState(100);

    const calculFight = () => {
      if (attack_J1 > attack_J2) {
        const damage = attack_J1 - attack_J2;
        setLifePoint_J2(lifePoint_J2 - damage);
      } else if (attack_J1 < attack_J2) {
        const damage = attack_J2 - attack_J1;
        setLifePoint_J1(lifePoint_J1 - damage);
      }
      shuffleHand();
    }

  return (
    <div>
        <h1>Life</h1>
        <p>Life J1: {lifePoint_J1}</p>
        <p>Life J2: {lifePoint_J2}</p>
        <h1>Attack</h1>
        <p>Attack J1: {attack_J1}</p>
        <p>Attack J2: {attack_J2}</p>
        <button onClick={calculFight} style={{ background: 'grey' }}>Attack</button>
    </div>
  )
}
