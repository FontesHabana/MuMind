import {useState, useEffect} from 'react';
import React from 'react';
import { motion, AnimatePresence, degrees } from "framer-motion";
import QuestionCard from './QuestionCard';
import ScoreBoard from './ScoreBoard';
import Timer from './Timer';
import { div } from "framer-motion/client";
import { useLanguage } from '../contexts/LanguageContext';




export default function GameManager({players,setPlayers, onEnd, onNewGame}){
    const [isVisible,setIsVisible]=useState(true);
    const [playerWithCow, setPlayerWithCow]=useState(null);
    const [showCardQuestion,setShowCardQuestion]=useState(true);
    const [questions,setQuestions]=useState([]);
    const { currentLanguage, loadQuestions } = useLanguage();

    // Cargar preguntas cuando cambie el idioma
    useEffect(() => {
        async function getQuestions() {
            try {
                console.log('Idioma actual:', currentLanguage);
                const loadedQuestions = await loadQuestions();
                console.log('Preguntas cargadas en GameManager:', loadedQuestions);
                setQuestions(loadedQuestions || []);
            } catch (error) {
                console.error('Error al cargar preguntas:', error);
                setQuestions([]);
            }
        }
        
        if (currentLanguage) {
            getQuestions();
        }
    }, [currentLanguage, loadQuestions]);

    function exitComponent(){
        setIsVisible(false);
        setTimeout(()=>{
            onEnd();
        },150);    }

    function test(){
        if (Array.isArray(questions)) {
        console.log("es un array con", questions.length, "preguntas");
        console.log("Primera pregunta:", questions[0]);
      }
      else{
console.log("no es un array, tipo:", typeof questions, "valor:", questions);
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
                 {  showCardQuestion && questions && questions.length > 0 ?(<QuestionCard 
                 questions={questions}
                  setQuestions={setQuestions}
                  onFlipComplete={()=>{setShowCardQuestion(false);
                   
                  }}
                 />)
                 : showCardQuestion ? (
                   <div className="text-white text-xl">Cargando preguntas...</div>
                 ):
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