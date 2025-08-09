import {useState} from 'react';
import { useEffect } from 'react';
import { motion, AnimatePresence, degrees } from "framer-motion";
import { div } from "framer-motion/client";

export default function Timer(){
    const [count, setCount]=useState(30);
    const [isVisible,setIsVisible]=useState(true);

    useEffect(()=>{
    
        if (count>0) {
          const timer=setTimeout(()=>setCount(count-1),1000);
          return()=>clearTimeout(timer);
        }
      
      },[count]);

    
     return(
        <AnimatePresence>
        <motion.div className='w-30 h-15 m-2 flex justify-center items-center rounded-4xl bg-pink-900'
         initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}>
            <p className='text-white text-3xl font-bold'>{count}</p>
        </motion.div>
        </AnimatePresence>
     )



    } 