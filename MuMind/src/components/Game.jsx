import { useState } from "react";
import Home  from "./Home";
import LobbyScreen from "./Lobby";
export default function Game(){
   const [currentScreen,setCurrentScreen]=useState('welcome');
   const [players, setPlayers]=useState([]);
   const [playerWithCow, setPlayerWithCow]=useState(null);
   const [currentQuestion, setCurrentQuestion] =useState('');


    const renderScreen=() => {
        switch(currentScreen){
            case 'welcome':
                return <Home onStart={()=>setCurrentScreen('lobby')} />;
            case 'lobby':
                return (
                    <LobbyScreen
                    players={players}
                    setPlayers={setPlayers}
                    onStartGame={()=>{return true}}
                    onExit ={()=>setCurrentScreen('welcome')}/>
                )
        }
    }


   return(
    <div className="relative min-h-screen   overflow-hidden bg-pink-200 ">
        {renderScreen()}
    </div>
   )
}