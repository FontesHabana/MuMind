import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../utils/i18n';

// Importar archivos de preguntas
import questionsEn from '../data/questions.json';
import questionsEs from '../data/questions-es.json';
import questionsFr from '../data/questions-fr.json';
import questionsDe from '../data/questions-de.json';

const QuestionsContext = createContext();

export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error('useQuestions must be used within a QuestionsProvider');
  }
  return context;
};

export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState(questionsEn); // español por defecto

  const questionsByLanguage = {
    en: questionsEn,
    es: questionsEs,
    fr: questionsFr,
    de: questionsDe
  };

  useEffect(() => {
    const currentLanguage = i18n.language || 'en';
    const currentQuestions = questionsByLanguage[currentLanguage] || questionsByLanguage.en;
    setQuestions(currentQuestions);

    // Escuchar cambios de idioma
    const handleLanguageChange = (lng) => {
      const newQuestions = questionsByLanguage[lng] || questionsByLanguage.en;
      setQuestions(newQuestions);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const getRandomQuestions = (count = 10) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const value = {
    questions,
    getRandomQuestions,
    currentLanguage: i18n.language || 'es'
  };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
};
