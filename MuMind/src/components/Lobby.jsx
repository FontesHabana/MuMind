import {useState} from 'react';
import AddPlayerModal from './AddPlayer';
import Home from './Home';
import { motion, AnimatePresence, degrees } from "framer-motion";
import { div } from "framer-motion/client";

export default function LobbyScreen({players, setPlayers, onStartGame, onExit}){
    const [showAddPlayerModal, setShowAddPlayerModal] =useState(false);
    const [isVisible,setIsVisible]=useState(true);
    const removePlayer=(id)=>{setPlayers(players.filter(player=>player.id!==id))}
    function exitComponent(){
        setIsVisible(false);
        setPlayers([]);
        setTimeout(()=>{
            onExit();
        },150);    }
    function newGame(){
        if (players.length>0) {
            onStartGame();
        }
    }

    return(
      
             <AnimatePresence>
                 {isVisible && (    <motion.div className=" h-screen flex justify-center items-center    bg-pink-400/70 backdrop-blur-sm  overflow-hidden  p-3 "
         initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
       
                <motion.div
                className='m-[3vw] flex flex-col items-center justify-center bg-white w-[90vw]  lg:w-[70vw] min-h-[80vh] overflow-hidden rounded-xl  p-8'
                  initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}>

           
            <h2 className='text-4xl font-bold text-center mb-6 '>Players</h2>
            <div className='max-h-[60vh] min-w-[100%] lg:min-w-[80%] space-y-4 mb-6 self-center overflow-hidden overflow-y-auto'>
                {players.map(player=>(
                    <div key={player.id} className='bg-white  rounded-lg   flex items-center justify-between'>
                        <div className='flex items-center'>
                        <img src={`/images/${player.image}`} 
                             alt={player.name}
                             className='w-16 h-16 rounded-full mr-4' />
                        <p className='font-medium text-lg'>
                            {player.name}
                        </p>
                        </div>
                        <button onClick={()=>{removePlayer(player.id)}} className=' mr-2  transition-transform duration-300 ease-in.out transform hover:scale-110 hover:cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 1024 1024"><path fill="#ff0000" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>
                        </button>
                    </div>
                    
                ))}
            </div>
           
           <div className='mt-auto w-[80%] flex flex-wrap  justify-center items-center'> 
                 <button onClick={()=> setShowAddPlayerModal(true)} className="bg-pink-500 m-2 mt-auto text-center w-[25%] min-w-40 whitespace-nowrap  text-white font-bold text-1xl lg:text-2xl  lg:px-6 lg:py-2 px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">Add Player</button>
           {/*Añadir logica inicio */}
           <button onClick={newGame}  className="bg-pink-500 m-2 w-[25%] min-w-40 whitespace-nowrap text-white font-bold text-1xl lg:text-2xl  lg:px-6 lg:py-2 px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">Start Game</button>

           <button onClick={exitComponent} className="bg-pink-500 m-2 w-[25%] min-w-40 text-white font-bold text-1xl lg:text-2xl  lg:px-6 lg:py-2 px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">Exit</button>
           </div>
          
                
            
                </motion.div>
            {
                showAddPlayerModal && (
                    <AddPlayerModal 
                    onClose ={()=> setShowAddPlayerModal(false)}
                    onAddPlayer={(newPlayer)=>{
                        setPlayers([...players,newPlayer]);
                        setShowAddPlayerModal(false);
                   }}
                    players={players}
                    />
                )
            }
  
        </motion.div>)}
    
          </AnimatePresence>
    );
}