import {useState} from 'react';
import AddPlayerModal from './AddPlayer';
import Home from './Home';
import { motion, AnimatePresence, degrees } from "framer-motion";
import { div } from "framer-motion/client";
import { useLanguage } from '../contexts/LanguageContext';

export default function ScoreBoard({players,setPlayers, onNewRound, onExit, onNewGame}){
     const { t } = useLanguage();
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

           
            <h2 className='text-4xl font-bold text-center mb-6 '>{t("game.players")}</h2>
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
                        <div className='flex flex-col mt-2  justify-center items-center'>
                         <button onClick={()=>{addPoint(player.id)}} className='self-center   transition-transform duration-300 ease-in.out transform hover:scale-110 hover:cursor-pointer'>
                           
                            <svg xmlns="http://www.w3.org/2000/svg"className="lg:w-[25px] lg:h-[25px] w-[20px] h-[20px]" viewBox="0 0 24 24">

<title/>

<g id="Complete">

<g data-name="add" id="add-2">

<g>

<line fill="none" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="19" y2="5"/>

<line fill="none" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="5" x2="19" y1="12" y2="12"/>

</g>

</g>

</g>

</svg>
                          
                   
                        </button>
                         <button onClick={()=>{removePoint(player.id)}} className='self-center   transition-transform duration-300 ease-in.out transform hover:scale-110 hover:cursor-pointer'>
                              <svg xmlns="http://www.w3.org/2000/svg" className="lg:w-[25px] lg:h-[25px] w-[20px] h-[20px]" viewBox="0 0 24 24" fill="none">
<path d="M7 12L17 12" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
      
                        </button>
                        </div>
                     
                    </div>
                    
                ))}
            </div>
           
           <div className='mt-auto w-[80%] flex flex-wrap  justify-center items-center'> 
                
           <button onClick={onNewRound}  className="bg-pink-500 m-2 min-w-40 whitespace-nowrap text-white font-bold text-1xl lg:text-2xl  lg:px-6 lg:py-2 px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">{t("game.rounds")}</button>

           <button onClick={newGameOption}  className="bg-pink-500 m-2 min-w-40 whitespace-nowrap text-white font-bold text-1xl lg:text-2xl  lg:px-6 lg:py-2 px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">{t("game.playAgain")}</button>

           <button onClick={exitComponent} className="bg-pink-500 m-2 min-w-40 text-white font-bold text-1xl lg:text-2xl  lg:px-6 lg:py-2 px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">{t("game.exit")}</button>
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