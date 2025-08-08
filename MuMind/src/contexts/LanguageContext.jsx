import React, { createContext, useContext, useState, useEffect } from 'react';

// Traducciones estáticas integradas
const translations = {
  es: {
    home: {
      title: "MENTE",
      subtitle: "VACUNA",
      play: "Jugar",
      howToPlay: "Cómo Jugar",
      settings: "Configuración"
    },
    settings: {
      title: "Configuración",
      language: "Idioma",
      selectLanguage: "Selecciona tu idioma",
      english: "Inglés",
      spanish: "Español",
      french: "Francés",
      german: "Alemán",
      close: "Cerrar"
    },
    howToPlay: {
      title: "Cómo Jugar",
      instructions: [
        "1. Agrega jugadores a la partida",
        "2. Selecciona la cantidad de rondas",
        "3. Responde las preguntas rápidamente",
        "4. Gana puntos por respuestas correctas",
        "5. ¡El jugador con más puntos gana!"
      ]
    },
    game: {
      players: "Jugadores",
      rounds: "Rondas",
      start: "Iniciar Partida",
      addPlayer: "Agregar Jugador",
      playerName: "Nombre del jugador",
      remove: "Eliminar",
      question: "Pregunta",
      timeUp: "¡Tiempo agotado!",
      correct: "¡Correcto!",
      incorrect: "Incorrecto",
      nextPlayer: "Siguiente Jugador",
      finalScores: "Puntuaciones Finales",
      winner: "¡Ganador!",
      playAgain: "Jugar de Nuevo"
    }
  },
  en: {
    home: {
      title: "HERD",
      subtitle: "MENTALITY",
      play: "New Game",
      howToPlay: "How to Play",
      settings: "Settings"
    },
    settings: {
      title: "Settings",
      language: "Language",
      selectLanguage: "Select your language",
      english: "English",
      spanish: "Spanish",
      french: "French",
      german: "German",
      close: "Close"
    },
    howToPlay: {
      title: "How to Play",
      instructions: [
        "1. Add players to the game",
        "2. Select the number of rounds",
        "3. Answer questions quickly",
        "4. Earn points for correct answers",
        "5. The player with the most points wins!"
      ]
    },
    game: {
      players: "Players",
      rounds: "Rounds",
      start: "Start Game",
      addPlayer: "Add Player",
      playerName: "Player name",
      remove: "Remove",
      question: "Question",
      timeUp: "Time's up!",
      correct: "Correct!",
      incorrect: "Incorrect",
      nextPlayer: "Next Player",
      finalScores: "Final Scores",
      winner: "Winner!",
      playAgain: "Play Again"
    }
  },
  fr: {
    home: {
      title: "MuMind",
      subtitle: "Jeu de Questions",
      play: "Jouer",
      howToPlay: "Comment Jouer",
      settings: "Paramètres"
    },
    settings: {
      title: "Paramètres",
      language: "Langue",
      selectLanguage: "Sélectionnez votre langue",
      english: "Anglais",
      spanish: "Espagnol",
      french: "Français",
      german: "Allemand",
      close: "Fermer"
    },
    howToPlay: {
      title: "Comment Jouer",
      instructions: [
        "1. Ajoutez des jugadores a la partie",
        "2. Seleccione la cantidad de tours",
        "3. Répondez rapidement aux questions",
        "4. Gagnez des points pour les bonnes réponses",
        "5. Le joueur avec le plus de points gagne !"
      ]
    },
    game: {
      players: "Joueurs",
      rounds: "Tours",
      start: "Commencer la Partie",
      addPlayer: "Ajouter Joueur",
      playerName: "Nom du joueur",
      remove: "Supprimer",
      question: "Question",
      timeUp: "Temps écoulé !",
      correct: "Correct !",
      incorrect: "Incorrect",
      nextPlayer: "Joueur Suivant",
      finalScores: "Scores Finaux",
      winner: "Gagnant !",
      playAgain: "Rejouer"
    }
  },
  de: {
    home: {
      title: "MuMind",
      subtitle: "Quiz Spiel",
      play: "Spielen",
      howToPlay: "Wie man spielt",
      settings: "Einstellungen"
    },
    settings: {
      title: "Einstellungen",
      language: "Sprache",
      selectLanguage: "Wählen Sie Ihre Sprache",
      english: "Englisch",
      spanish: "Spanisch",
      french: "Französisch",
      german: "Deutsch",
      close: "Schließen"
    },
    howToPlay: {
      title: "Wie man spielt",
      instructions: [
        "1. Fügen Sie Spieler zum Spiel hinzu",
        "2. Wählen Sie die Anzahl der Runden",
        "3. Beantworten Sie Fragen schnell",
        "4. Verdienen Sie Punkte für richtige Antworten",
        "5. Der Spieler mit den meisten Punkten gewinnt!"
      ]
    },
    game: {
      players: "Spieler",
      rounds: "Runden",
      start: "Spiel Starten",
      addPlayer: "Spieler Hinzufügen",
      playerName: "Spielername",
      remove: "Entfernen",
      question: "Frage",
      timeUp: "Zeit ist um!",
      correct: "Richtig!",
      incorrect: "Falsch",
      nextPlayer: "Nächster Spieler",
      finalScores: "Endstand",
      winner: "Gewinner!",
      playAgain: "Nochmal Spielen"
    }
  }
};

// Mapeo de archivos de preguntas por idioma
const questionFiles = {
  es: () => import('../data/questions-es.json'),
  en: () => import('../data/questions.json'), // archivo base en inglés
  fr: () => import('../data/questions-fr.json'),
  de: () => import('../data/questions-de.json')
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('es'); // Cambiado a 'es' por defecto
  const [questions, setQuestions] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  // Función para obtener traducciones
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Si no encuentra la traducción, devuelve la clave
      }
    }
    
    return value || key;
  };

  // Función para cargar preguntas según el idioma
  const loadQuestions = async (language = currentLanguage) => {
    console.log('Cargando preguntas para idioma:', language);
    setIsLoadingQuestions(true);
    try {
      const questionModule = await questionFiles[language]();
      const loadedQuestions = questionModule.default?.questions || questionModule.questions || [];
      console.log('Preguntas cargadas:', loadedQuestions);
      setQuestions(loadedQuestions);
      return loadedQuestions;
    } catch (error) {
      console.error(`Error cargando preguntas para idioma ${language}:`, error);
      // Fallback a español si hay error
      if (language !== 'es') {
        try {
          const fallbackModule = await questionFiles.es();
          const fallbackQuestions = fallbackModule.default?.questions || fallbackModule.questions || [];
          setQuestions(fallbackQuestions);
          return fallbackQuestions;
        } catch (fallbackError) {
          console.error('Error cargando fallback:', fallbackError);
          setQuestions([]);
          return [];
        }
      }
      setQuestions([]);
      return [];
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Función para cambiar idioma
  const changeLanguage = (language) => {
    if (translations[language]) {
      setCurrentLanguage(language);
      localStorage.setItem('mumind-language', language);
      loadQuestions(language);
    }
  };

  // Cargar idioma guardado al inicializar
  useEffect(() => {
    const savedLanguage = localStorage.getItem('mumind-language') || 'es';
    setCurrentLanguage(savedLanguage);
    loadQuestions(savedLanguage);
  }, []);

  // Lista de idiomas disponibles
  const availableLanguages = [
    { code: 'es', name: t('settings.spanish') },
    { code: 'en', name: t('settings.english') },
    { code: 'fr', name: t('settings.french') },
    { code: 'de', name: t('settings.german') }
  ];

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    questions,
    isLoadingQuestions,
    availableLanguages,
    loadQuestions
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
