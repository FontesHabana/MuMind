import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsModal() {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showOptions, setShowOptions] = useState(false);

  const availableLanguages = ["Spanish", "English", "French","Deutch"];

  const handleSelect = (lang) => {
    setSelectedLanguage(lang);
    setShowOptions(false); // Oculta el menú después de elegir
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-azul-cielo">
      {/* ✅ Botón abrir modal */}
      {!open && (
         <button onClick={() => setOpen(true)}   className="absolute z-20 right-5 top-5 flex items-center hover: cursor-pointer">
            <svg className="w-10 h-10 transition-transform duration-300 ease-in-out transform hover:scale-110" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none">

<g id="SVGRepo_bgCarrier" strokeWidth="0"/>

<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

<g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="3" stroke="#ee3fae" strokeWidth="1.5"/> <path d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z" stroke="#ee3fae" strokeWidth="1.5"/> </g>

</svg>
        </button>
      )}

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
                    <div className="flex flex-col gap-4 text-2xl">
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
                    </div>
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