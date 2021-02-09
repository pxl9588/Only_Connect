import './tailwind.css';
import './Components/PSWall';
import Game from './Components/Game';

function Apps() {

  return (
    <div className="App h-screen w-screen overflow-hidden">
     <Game></Game>
    </div>
  );
}

export default App;
