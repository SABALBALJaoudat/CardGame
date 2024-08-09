import "./Css/App.scss";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Acceuil from './Page/Acceuil';
import Game from './Page/Board';
import Collection from "./Page/Collection";
import Deck from "./Page/Deck";
import DecksInitializer from "./Data/DecksInitializer";

export default function App() {

  return (
    <Router>
      <div className="App">
        <DecksInitializer />
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/game" element={<Game />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/deck" element={<Deck />} />
        </Routes>
      </div>
    </Router>
  );
}
