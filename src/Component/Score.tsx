import { useState } from 'react'

interface ScoreProps {
  attack_J1: number;
  attack_J2: number;
  energie_J1: number;
  energie_J2: number;
  shuffleHand: () => void;
}

export default function Score({ attack_J1, attack_J2, energie_J1, energie_J2, shuffleHand }: ScoreProps) {
  const [lifePoint_J1, setLifePoint_J1] = useState(100);
  const [lifePoint_J2, setLifePoint_J2] = useState(100);
  const [energieScore_J1, setEnergieScore_J1] = useState(0);
  const [energieScore_J2, setEnergieScore_J2] = useState(0);

  const calculFight = () => {
    if (attack_J1 > attack_J2) {
      const damage = attack_J1 - attack_J2;
      setLifePoint_J2(lifePoint_J2 - damage);
    } else if (attack_J1 < attack_J2) {
      const damage = attack_J2 - attack_J1;
      setLifePoint_J1(lifePoint_J1 - damage);
    }
    setEnergieScore_J1(energie_J1 + 7);
    setEnergieScore_J2(energie_J2 + 7);
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
      <h1>Energie</h1>
      <p>Energie J1: {energieScore_J1}</p>
      <p>Energie J2: {energieScore_J2}</p>
      <p>Energie J1: {energie_J1}</p>
      <p>Energie J2: {energie_J2}</p>
      <button onClick={calculFight} style={{ background: 'grey' }}>Attack</button>
    </div>
  )
}
