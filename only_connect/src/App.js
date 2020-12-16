import './tailwind.css';
import './Components/PSWall';
import PSWall from './Components/PSWall';
import WordWall from './Components/WordWall';
import PSRow from './Components/PSRow';
import MissingVowels from './Components/MissingVowels';
import {useEffect,useState} from 'react';

function App() {
  //const [data,setData]=useState([]);
  /* const getData=()=>{
    fetch('/game_files/Game_1.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[]) */

  return (
    <div className="App h-screen overflow-hidden">
      <WordWall></WordWall>
    </div>
  );
}

export default App;
