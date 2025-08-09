import React, { createContext, useContext, useState, useEffect } from 'react';

// Traducciones estáticas integradas
const translations = {
  es: {
    home: {
      title: "MENTE",
      subtitle: "VACUNA",
      play: "Nuevo Juego",
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
        "1. Necesitarás papel y lápiz para mantener el puntaje y escribir respuestas.",
        "2. También necesitarás una 'vaca rosa' - toca la imagen del jugador para asignarla.",
        "3. Lee una pregunta. Cada jugador escribe la respuesta que cree que otros jugadores también elegirán.",
        "4. Todos muestran sus respuestas. Los jugadores que dieron la respuesta más común obtienen 1 punto.",
        "5. Si dos respuestas diferentes son igualmente comunes, nadie obtiene puntos.",
        "6. Si un jugador es el único en dar una respuesta que no coincide con ninguna otra, obtiene la vaca rosa.",
        "7. Si tienes la vaca rosa, puedes seguir puntuando, pero no puedes ganar. Solo puedes pasarla cuando alguien más dé una respuesta única.",
        "8. ¡El primer jugador en obtener 8 puntos es el ganador!",
        "9. Si hay empate, juega hasta 9 puntos... luego 10... y así hasta que alguien esté un punto por delante."
      ]
    },
    game: {
      players: "Jugadores",
      rounds: "Nueva Ronda",
      start: "Iniciar Partida",
      addPlayer: "Agregar Jugador",
      playerName: "Nombre del jugador",
     exit:"Salir",
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
        "1. You'll need a pen and paper, for keeping score and writing answers.",
        "2. You'll also need a 'pink cow' — tap the player's image to assign it.",
        "3. Read out a question. Each player writes down the answer they think most other players will also pick.",
        "4. Everyone shows their answers. Players who gave the answer that was most common get 1 point.",
        "5. If two different answers are equally common, no one gets any points.",
        "6. If a player is the only one to give an answer that doesn't match at least one other, then they get the pink cow.",
        "7. If you have the pink cow, you can keep scoring points, but you can't win the game. You can only pass it on when someone else gives a stand alone answer.",
        "8. The first player to get 8 points is the winner!",
        "9. If you have a draw, play first to 9 points… then 10… and so on until someone ends up one point ahead of everyone else."
      ]
    },
    game: {
      players: "Players",
      rounds: "New Round",
      start: "Start Game",
      addPlayer: "Add Player",
      playerName: "Player name",
      remove: "Remove",
      exit:"Exit",
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
        "1. Vous aurez besoin d'un stylo et de papier pour garder le score et écrire les réponses.",
        "2. Vous aurez aussi besoin d'une 'vache rose' — touchez l'image du joueur pour l'assigner.",
        "3. Lisez une question. Chaque joueur écrit la réponse qu'il pense que la plupart des autres joueurs choisiront aussi.",
        "4. Tout le monde montre ses réponses. Les joueurs qui ont donné la réponse la plus commune obtiennent 1 point.",
        "5. Si deux réponses différentes sont également communes, personne n'obtient de points.",
        "6. Si un joueur est le seul à donner une réponse qui ne correspond à aucune autre, alors il obtient la vache rose.",
        "7. Si vous avez la vache rose, vous pouvez continuer à marquer des points, mais vous ne pouvez pas gagner le jeu. Vous ne pouvez la transmettre que quand quelqu'un d'autre donne une réponse unique.",
        "8. Le premier joueur à obtenir 8 points est le gagnant !",
        "9. En cas d'égalité, jouez jusqu'à 9 points… puis 10… et ainsi de suite jusqu'à ce que quelqu'un ait un point d'avance."
      ]
    },
    game: {
      players: "Joueurs",
      rounds: "Nouvelle Tours",
      start: "Commencer la Partie",
      addPlayer: "Ajouter Joueur",
      playerName: "Nom du joueur",
      exit:"Retourner",
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
        "1. Sie benötigen Stift und Papier, um die Punkte zu verfolgen und Antworten zu schreiben.",
        "2. Sie benötigen auch eine 'rosa Kuh' — berühren Sie das Spielerbild, um sie zuzuweisen.",
        "3. Lesen Sie eine Frage vor. Jeder Spieler schreibt die Antwort auf, die er denkt, dass die meisten anderen Spieler auch wählen werden.",
        "4. Alle zeigen ihre Antworten. Spieler, die die häufigste Antwort gegeben haben, erhalten 1 Punkt.",
        "5. Wenn zwei verschiedene Antworten gleich häufig sind, bekommt niemand Punkte.",
        "6. Wenn ein Spieler der einzige ist, der eine Antwort gibt, die mit keiner anderen übereinstimmt, dann bekommt er die rosa Kuh.",
        "7. Wenn Sie die rosa Kuh haben, können Sie weiter Punkte sammeln, aber Sie können das Spiel nicht gewinnen. Sie können sie nur weitergeben, wenn jemand anderes eine einzigartige Antwort gibt.",
        "8. Der erste Spieler, der 8 Punkte erreicht, ist der Gewinner!",
        "9. Bei Gleichstand spielen Sie bis 9 Punkte… dann 10… und so weiter, bis jemand einen Punkt voraus ist."
      ]
    },
    game: {
      players: "Spieler",
      rounds: "Runden",
      start: "Spiel Starten",
      addPlayer: "Spieler Hinzufügen",
      playerName: "Spielername",
      exit:"Ausfahrt",
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
