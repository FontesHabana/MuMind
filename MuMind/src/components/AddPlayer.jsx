import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { div, image } from "framer-motion/client";
import { useLanguage } from "../contexts/LanguageContext";
const avatarOptions=[
    'avatar1.webp',
    'avatar2.webp',
    'avatar3.webp',
    'avatar4.webp',
    'avatar5.webp',
    'avatar6.webp',

]


export default function AddPlayerModal({onClose,onAddPlayer,players}) {
  const {t}=useLanguage();
  const [playerName, setPlayerName]=useState('');
  const [selectedAvatar, setSelectedAvatar]=useState(avatarOptions[0]);
  const[error, setError]=useState('');

  const handleSubmit=(e)=>{
    e.preventDefault();


    if (!playerName.trim()) {
        setError('Please insert a valid name');
        return;
    }
    if (playerName.length<3||playerName.length>10) {
        setError('Please insert a valid name');
        return;
    }
    if (players.some(player=>player.name===playerName)) {
        setError('This name already exits in the game');
        return;
    }
    if (!selectedAvatar) {
        setError('Please select a avatar');
        return;
    }

    onAddPlayer({
        id:Date.now(),
        name:playerName.trim(),
        image:selectedAvatar,
        points:0,
        hasCow:false,
    });

    setPlayerName('');
    setSelectedAvatar(avatarOptions[0]);
    setError('')
  };

  return (
    <div className="relative   flex flex-col items-center justify-center bg-azul-cielo">
     

      {/* ✅ Modal animado */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center  bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
            onClick={(e)=>e.stopPropagation()}
              className="h-[80vh] bg-white  mx-2 overflow-y-auto rounded-xl shadow-lg p-8 w-96  text-center sm:w-[28rem]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              

            <div className="p-6">
                <form onSubmit={handleSubmit}>

                    <div className="mb-6">
                        <label htmlFor="playerName" className="block text-gray-700 font-medium mb-2">
                            {t("game.playerName")}
                        </label>
                        <input type="text"
                               id="playerName"
                               value={playerName}
                               onChange={(e)=>{setPlayerName(e.target.value);
                                                setError('');
                               }}
                               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-blue-500 outline-none transition"
                               placeholder="Ej: Mrcharlzz"
                               autoFocus/>            
                    </div>

                    <div className="mb-6">
                         <label  className="block text-gray-700 font-medium mb-2">
                            Avatar
                        </label>
                        <div className="flex flex-wrap justify-center items-center grid-cols-3 sm:grid-cols-6 gap-3">
                            {avatarOptions.map((avatar)=>(
                                <div 
                                key={avatar}
                                onClick={()=>setSelectedAvatar(avatar)}
                                className={` w-20 h-20  cursor-pointer mb-3 p-1 rounded-full transition-all ${selectedAvatar===avatar? 'ring-4 ring-pink-500 transform scale-105':'hover:ring-2 hover:ring-gray-300'}`}>
                                    <img src={`/images/${avatar}`} alt={`Avatar ${avatar}`}
                                    className="w-full h-full rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {error &&(
                        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-lg text-center">{error}</div>
                    )}

                      <button type="submit" className="bg-pink-500 m-2 text-white font-bold text-1xl lg:text-2xl  lg:px-6 lg:py-2 px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">{t("game.addPlayer")}</button>

              {/* ✅ Botón cerrar */}
              <motion.button
                onClick={() => {onClose(); setError('')}}
                className="mt-6  cursor-pointer"
              >
               <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-4 right-4  transition-transform duration-300 ease-in-out transform hover:scale-110 fill-white w-10 h-10     hover:fill-pink-300"  viewBox="0 0 1024 1024"><path   d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>

              </motion.button>
                </form>
            </div>

            
          
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}