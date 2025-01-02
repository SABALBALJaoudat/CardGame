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
    <div className="score">
      <div className="playersInformations">
        <div className="playerInformation">
          <p>Player 1</p>
          <div className="playerStats">
            <p>Life: {lifePoint_J1}</p>
            <p>Attack: {attack_J1}</p>
            <p>Energie: {energie_J1}</p>
          </div>
        </div>
        <div className="playerInformation">
          <p>Player 2</p>
          <div className="playerStats">
            <p>Life: {lifePoint_J2}</p>
            <p>Attack: {attack_J2}</p>
            <p>Energie: {energie_J2}</p>
          </div>
        </div>
      </div>
      <button onClick={calculFight} style={{ background: 'grey' }}>Attack</button>
    </div>
  )
}
