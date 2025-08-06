import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsModal({open,setOpen}) {

  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showOptions, setShowOptions] = useState(false);

  const availableLanguages = ["Spanish", "English", "French","Deutch"];

  const handleSelect = (lang) => {
    setSelectedLanguage(lang);
    setShowOptions(false); // Oculta el menú después de elegir
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-azul-cielo">
     

      {/* ✅ Modal animado */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 w-96 text-center sm:w-[28rem]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold mb-6">Settings</h2>

              {/* ✅ Dropdown Idioma */}
              <div className="mb-2 text-center relative">
               
                <div
  onClick={() => setShowOptions(!showOptions)}
  className="flex justify-center items-center bg-white p-3 rounded-xl cursor-pointer text-2xl py-2 hover:bg-pink-300 cursor-pointer "
>
  <span className="text-center font-semibold">{selectedLanguage}</span>
               
                </div>

                {/* ✅ Menú de opciones */}
               <AnimatePresence>
  {showOptions && (
    <motion.ul
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute w-full mt-2 bg-white border rounded-lg shadow-md z-10"
    >
      {availableLanguages.map((lang) => (
        <li
          key={lang}
          onClick={() => handleSelect(lang)}
          className="px-4 py-2 text-2xl text-center hover:bg-pink-300 cursor-pointer rounded-lg"
        >
          {lang}
        </li>
      ))}
    </motion.ul>
  )}
</AnimatePresence>
            </div>
                   {/*   <div className="flex flex-col gap-4 text-2xl">
                        <motion.button 
                            className=" py-2 rounded-xl hover:bg-pink-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Option1
                        </motion.button>
                        <motion.button 
                            className=" py-2 rounded-xl hover:bg-pink-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Option2
                        </motion.button>
                        <motion.button 
                            className=" py-2 rounded-xl hover:bg-pink-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Option3
                        </motion.button>
                    </div>*/}
              {/* ✅ Botón cerrar */}
              <motion.button
                onClick={() => setOpen(false)}
                className="mt-6  cursor-pointer"
              >
               <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-4 right-4 transition-transform duration-300 ease-in-out transform hover:scale-110 fill-white w-10 h-10     hover:fill-pink-300"  viewBox="0 0 1024 1024"><path   d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>

              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}