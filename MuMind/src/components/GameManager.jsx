import {useState} from 'react';
import React from 'react';
import { motion, AnimatePresence, degrees } from "framer-motion";
import QuestionCard from './QuestionCard';
import ScoreBoard from './ScoreBoard';
import { div } from "framer-motion/client";
import data from '../data/questions.json'



export default function GameManager({players,setPlayers, onEnd, onNewGame}){
    const [isVisible,setIsVisible]=useState(true);
    const [playerWithCow, setPlayerWithCow]=useState(null);
    const [showCardQuestion,setShowCardQuestion]=useState(true);
    const [questions,setQuestions]=useState(data.questions);

    function exitComponent(){
        setIsVisible(false);
        setTimeout(()=>{
            onEnd();
        },150);    }

    function test(){
        if (Array.isArray(questions)) {
        console.log("es un array");
      }
      else{
console.log("no es un array");
      }
    }

    return(
           
             <AnimatePresence>
                 {isVisible && (   
                     <motion.div className=" h-screen flex justify-center items-center    bg-pink-400/70 backdrop-blur-sm  overflow-hidden  p-3 "
         initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
       {test()}
                 {  showCardQuestion?(<QuestionCard 
                 questions={questions}
                  setQuestions={setQuestions}
                  onFlipComplete={()=>{setShowCardQuestion(false);
                   
                  }}
                 />):
                 (<ScoreBoard
                  players={players}
                  setPlayers={setPlayers}
                  onNewRound={()=>{setShowCardQuestion(true);}}
                  onExit={onEnd}
                  onNewGame={onNewGame}
                 />)
 
                 }   
          
  
        </motion.div>)}
    
          </AnimatePresence>
    );
}