import { useState } from 'react'

interface ScoreProps {
  attack_J1: number;
  attack_J2: number;
  energie_J1: number;
  energie_J2: number;
  lifePoint_J1: number;
  lifePoint_J2: number;
  calculFight: () => void;
}

export default function Score({ attack_J1, attack_J2, energie_J1, energie_J2, lifePoint_J1, lifePoint_J2, calculFight }: ScoreProps) {

  return (
    <div>
      <h1>Life</h1>
      <p>Life J1: {lifePoint_J1}</p>
      <p>Life J2: {lifePoint_J2}</p>
      <h1>Attack</h1>
      <p>Attack J1: {attack_J1}</p>
      <p>Attack J2: {attack_J2}</p>
      <h1>Energie</h1>
      <p>Energie J1: {energie_J1}</p>
      <p>Energie J2: {energie_J2}</p>
      <button onClick={calculFight} style={{ background: 'grey' }}>Attack</button>
    </div>
  )
}
