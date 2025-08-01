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
                        <button onClick={()=>{removePlayer(player.id)}} className='w-5 h-5 bg-red-500 mr-2  transition-transform duration-300 ease-in.out transform hover:scale-110 hover:cursor-pointer'></button>
                    </div>
                    
                ))}
            </div>
           
           <div className='mt-auto w-[80%] flex flex-wrap  justify-center items-center'> 
                 <button onClick={()=> setShowAddPlayerModal(true)} className="bg-pink-500 m-2 mt-auto text-center w-[25%] min-w-40 whitespace-nowrap  text-white font-bold text-1xl lg:text-2xl  lg:px-6 lg:py-2 px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">Add Player</button>
           {/*Añadir logica inicio */}
           <button  className="bg-pink-500 m-2 w-[25%] min-w-40 whitespace-nowrap text-white font-bold text-1xl lg:text-2xl  lg:px-6 lg:py-2 px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">Start Game</button>

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