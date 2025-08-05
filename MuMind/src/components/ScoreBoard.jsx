import {useState} from 'react';
import AddPlayerModal from './AddPlayer';
import Home from './Home';
import { motion, AnimatePresence, degrees } from "framer-motion";
import { div } from "framer-motion/client";

export default function ScoreBoard({players,setPlayers, onNewRound, onExit, onNewGame}){
    const [showAddPlayerModal, setShowAddPlayerModal] =useState(false);
    const [isVisible,setIsVisible]=useState(true);
    const removePlayer=(id)=>{setPlayers(players.filter(player=>player.id!==id))}
    function exitComponent(){
        setIsVisible(false);
        setPlayers([]);
        setTimeout(()=>{
            onExit();
        },150);    }
   
    function newGameOption(){
        setPlayers(players.map(player=>({
            ...player,
            points: 0,
            hasCow: false
        })));
        onNewGame();
    }




    const addPoint=(id)=>{
        setPlayers(players.map(player=>{
            if(player.id===id){
                return {...player, points: player.points + 1}
            }
            return player;
        }))
    }
    const removePoint=(id)=>{
        setPlayers(players.map(player=>{
            if(player.id===id ){
                if (player.points>0) {
                     return {...player, points: player.points - 1}
                }
               
            }
            return player;
        }))
    }

    const toggleCow=(id)=>{
        setPlayers(players.map(player=>({
            ...player,
            hasCow: player.id === id ? !player.hasCow : false
        })));
    }


    return(
      
             <AnimatePresence>
                  
       
                <motion.div
                className='m-[3vw] flex flex-col items-center justify-center bg-white w-[90vw]  lg:w-[70vw] min-h-[80vh] overflow-hidden rounded-xl  p-2 sm:p-8 lg:p-8'
                  initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}>

           
            <h2 className='text-4xl font-bold text-center mb-6 '>Players</h2>
            <div className='max-h-[60vh] min-w-[100%] lg:min-w-[80%] space-y-4 mb-6 self-center '>
                {players.map(player=>(
                    <div key={player.id} className='bg-white  rounded-lg   flex  items-center justify-between'>
                        <div className='flex items-center'>
                        <div className='w-16 h-16 relative mr-4 group cursor-pointer' onClick={() => toggleCow(player.id)}>
                            <img 
                                src={`/images/${player.image}`} 
                                alt={player.name}
                                className="w-16 h-16 rounded-full transition-all duration-300 group-hover:scale-105" 
                            />
                            
                            {/* Filtro rosado transparente sobre la imagen cuando hasCow es true */}
                            {player.hasCow && (
                                <div className="absolute inset-0 bg-pink-400/60 rounded-full transition-all duration-300 pointer-events-none group-hover:scale-105"></div>
                            )}
                        </div>
                       
                        <p className='font-medium text-1xl sm:text-2xl lg:text-3xl'>
                            {player.name}
                        </p>
                        </div>
                        <p className='ml-auto mr-3 text-2xl sm:text-3xl lg:text-4xl'>{player.points}</p>
                        <div className='flex flex-col  justify-center items-center'>
                         <button onClick={()=>{addPoint(player.id)}} className='self-center   transition-transform duration-300 ease-in.out transform hover:scale-110 hover:cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="lg:w-[25px] lg:h-[25px] w-[20px] h-[20px]"  viewBox="0 0 1024 1024"><path fill="#ff0000" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>
                        </button>
                         <button onClick={()=>{removePoint(player.id)}} className='self-center   transition-transform duration-300 ease-in.out transform hover:scale-110 hover:cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="lg:w-[25px] lg:h-[25px] w-[20px] h-[20px]"  viewBox="0 0 1024 1024"><path fill="#ff0000" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>
                        </button>
                        </div>
                      
                    </div>
                    
                ))}
            </div>
           
           <div className='mt-auto w-[80%] flex flex-wrap  justify-center items-center'> 
                
           <button onClick={onNewRound}  className="bg-pink-500 m-2 w-[25%] min-w-40 whitespace-nowrap text-white font-bold text-1xl lg:text-2xl  lg:px-6 lg:py-2 px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">New Round</button>

           <button onClick={newGameOption}  className="bg-pink-500 m-2 w-[25%] min-w-40 whitespace-nowrap text-white font-bold text-1xl lg:text-2xl  lg:px-6 lg:py-2 px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">New Game</button>

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
  

    
          </AnimatePresence>
    );
}