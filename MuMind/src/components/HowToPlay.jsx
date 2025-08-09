import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from '../contexts/LanguageContext';

export default function HowToPlay({open,setOpen}){
    const { t } = useLanguage();
    return(
        <>
     

      <AnimatePresence>
        {open &&(
            <motion.div 
            className="fixed inset-0 z=50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
             initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
                
              <motion.div
              className="bg-white rounded-xl shadow-lg p-8 w-[90%] mx-w-xl max-h-[80vh] overflow-y-auto text-center"
               initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}>
                <h2 className="text-3xl font-bold mb-4">{t("howToPlay.title")}</h2>
                <div className="text-[1.2rem] mb-6 text-left">
                  {t("howToPlay.instructions").map((instruction, index) => (
                    <p key={index} className="mb-3">
                      {instruction}
                    </p>
                  ))}
                </div>

                
              </motion.div>
              <motion.button
                onClick={() => setOpen(false)}
                className="mt-6  cursor-pointer"
              >
               <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-4 right-4 transition-transform duration-300 ease-in-out transform hover:scale-110 fill-white w-10 h-10     hover:fill-pink-300"  viewBox="0 0 1024 1024"><path   d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>

              </motion.button>
            </motion.div>

        )}
      </AnimatePresence>

       </>
  )
}
