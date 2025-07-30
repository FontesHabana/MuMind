import {useState} from 'react';
import AddPlayerModal from './AddPlayer';
import { motion, AnimatePresence, degrees } from "framer-motion";
import { div } from "framer-motion/client";

export default function LobbyScreen({players, setPlayers, onStartGame, onExit}){
    const [showAddPlayerModal, setShowAddPlayerModal] =useState(false);

    return(
        <div className=" min-h-[80vh]  overflow-hidden  p-3 ">
            <div className='m-[3vw] flex flex-col items-center bg-white min-h-[80vh] overflow-hidden rounded-xl  p-8'>
            <h2 className='text-2xl font-bold text-center mb-6 '>Players</h2>
            <div className='space-y-4 mb-6 self-start lg:self-center'>
                {players.map(player=>(
                    <div key={player.id} className='bg-white  rounded-lg   flex items-center'>
                        <img src={`/images/${player.image}`} 
                             alt={player.name}
                             className='w-16 h-16 rounded-full mr-4' />
                        <p className='font-medium text-lg'>
                            {player.name}
                        </p>
                    </div>
                ))}
            </div>
           
           <div className='mt-auto w-[80%] flex flex-wrap justify-center items-center'> 
                 <button onClick={()=> setShowAddPlayerModal(true)} className="bg-pink-500 m-2 mt-auto w-[25%] min-w-40 text-white font-bold text-1xl lg:text-2xl  lg:px-6 lg:py-2 px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">Add Player</button>
           {/*Añadir logica inicio */}
           <button  className="bg-pink-500 m-2 w-[25%] min-w-40 text-white font-bold text-1xl lg:text-2xl  lg:px-6 lg:py-2 px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">Start Game</button>

           <button onClick={onExit} className="bg-pink-500 m-2 w-[25%] min-w-40 text-white font-bold text-1xl lg:text-2xl  lg:px-6 lg:py-2 px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">Exit</button>
           </div>
          
                
            </div>
            {
                showAddPlayerModal && (
                    <AddPlayerModal 
                    onClose ={()=> setShowAddPlayerModal(false)}
                    onAddPlayer={(newPlayer)=>{
                        setPlayers([...players,newPlayer]);
                        setShowAddPlayerModal(false);
                    }}
                    />
                )
            }
        </div>
    );
}