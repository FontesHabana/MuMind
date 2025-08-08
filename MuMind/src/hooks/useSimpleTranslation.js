import { useState, useEffect } from 'react';
import i18n from '../utils/i18n';

// Traducciones estáticas
const translations = {
  es: {
    "home.title": "MuMind",
    "home.subtitle": "Juego de Preguntas",
    "home.play": "Jugar",
    "home.howToPlay": "Cómo Jugar",
    "home.settings": "Configuración",
    "settings.title": "Configuración",
    "settings.language": "Idioma",
    "settings.selectLanguage": "Selecciona tu idioma",
    "settings.english": "Inglés",
    "settings.spanish": "Español",
    "settings.french": "Francés",
    "settings.german": "Alemán",
    "settings.close": "Cerrar",
    "howToPlay.title": "Cómo Jugar",
    "howToPlay.instructions.0": "1. Agrega jugadores a la partida",
    "howToPlay.instructions.1": "2. Selecciona la cantidad de rondas",
    "howToPlay.instructions.2": "3. Responde las preguntas rápidamente",
    "howToPlay.instructions.3": "4. Gana puntos por respuestas correctas",
    "howToPlay.instructions.4": "5. ¡El jugador con más puntos gana!"
  },
  en: {
    "home.title": "HERD",
    "home.subtitle": "MENTALITY",
    "home.play": "Play",
    "home.howToPlay": "How to Play",
    "home.settings": "Settings",
    "settings.title": "Settings",
    "settings.language": "Language",
    "settings.selectLanguage": "Select your language",
    "settings.english": "English",
    "settings.spanish": "Spanish",
    "settings.french": "French",
    "settings.german": "German",
    "settings.close": "Close",
    "howToPlay.title": "How to Play",
    "howToPlay.instructions.0": "1. Add players to the game",
    "howToPlay.instructions.1": "2. Select the number of rounds",
    "howToPlay.instructions.2": "3. Answer questions quickly",
    "howToPlay.instructions.3": "4. Earn points for correct answers",
    "howToPlay.instructions.4": "5. The player with the most points wins!"
  },
  fr: {
    "home.title": "MuMind",
    "home.subtitle": "Jeu de Questions",
    "home.play": "Jouer",
    "home.howToPlay": "Comment Jouer",
    "home.settings": "Paramètres",
    "settings.title": "Paramètres",
    "settings.language": "Langue",
    "settings.selectLanguage": "Sélectionnez votre langue",
    "settings.english": "Anglais",
    "settings.spanish": "Espagnol",
    "settings.french": "Français",
    "settings.german": "Allemand",
    "settings.close": "Fermer",
    "howToPlay.title": "Comment Jouer",
    "howToPlay.instructions.0": "1. Ajoutez des joueurs à la partie",
    "howToPlay.instructions.1": "2. Sélectionnez le nombre de tours",
    "howToPlay.instructions.2": "3. Répondez rapidement aux questions",
    "howToPlay.instructions.3": "4. Gagnez des points pour les bonnes réponses",
    "howToPlay.instructions.4": "5. Le joueur avec le plus de points gagne !"
  },
  de: {
    "home.title": "MuMind",
    "home.subtitle": "Quiz Spiel",
    "home.play": "Spielen",
    "home.howToPlay": "Wie man spielt",
    "home.settings": "Einstellungen",
    "settings.title": "Einstellungen",
    "settings.language": "Sprache",
    "settings.selectLanguage": "Wählen Sie Ihre Sprache",
    "settings.english": "Englisch",
    "settings.spanish": "Spanisch",
    "settings.french": "Französisch",
    "settings.german": "Deutsch",
    "settings.close": "Schließen",
    "howToPlay.title": "Wie man spielt",
    "howToPlay.instructions.0": "1. Fügen Sie Spieler zum Spiel hinzu",
    "howToPlay.instructions.1": "2. Wählen Sie die Anzahl der Runden",
    "howToPlay.instructions.2": "3. Beantworten Sie Fragen schnell",
    "howToPlay.instructions.3": "4. Verdienen Sie Punkte für richtige Antworten",
    "howToPlay.instructions.4": "5. Der Spieler mit den meisten Punkten gewinnt!"
  }
};

export const useSimpleTranslation = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Escuchar cambios de idioma de i18n
    const handleLanguageChange = (lng) => {
      setLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    setLanguage(i18n.language || 'en');

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language] || translations.en;
    
    for (const k of keys) {
      value = value[k];
      if (!value) break;
    }
    
    return value || key;
  };

  const changeLanguage = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  const getInstructions = () => {
    const instructions = [];
    for (let i = 0; i < 5; i++) {
      instructions.push(t(`howToPlay.instructions.${i}`));
    }
    return instructions;
  };

  return { t, changeLanguage, language, getInstructions };
};
