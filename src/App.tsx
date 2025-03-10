
import { motion } from "framer-motion";
import { useAIStore } from "./store/useAIStore";
import ProgressBar from './components/ProgressBar';

function App() {
  const { knowledge, increaseKnowledge, buyUpgrade, autoLearn, toggleAutoLearn, resetProgress, prestigeLevel } = useAIStore();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex flex-col items-center justify-center text-white font-sans">
      
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8"
      >
        🤖 AI Learning Simulator
      </motion.h1>

      
      <motion.button
        onClick={increaseKnowledge}
        className="bg-blue-700 hover:bg-blue-600 text-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 mb-4 w-full sm:w-auto"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Кликни для увеличения знаний
      </motion.button>

      
      <motion.button
        onClick={buyUpgrade}
        className="bg-green-600 hover:bg-green-500 text-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 mb-4 w-full sm:w-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Купить апгрейд (10 знаний)
      </motion.button>

      
      <motion.button
        onClick={toggleAutoLearn}
        className={`${autoLearn ? "bg-yellow-500 hover:bg-yellow-400" : "bg-gray-500 hover:bg-gray-400"} text-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 mb-4 w-full sm:w-auto`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {autoLearn ? "Выключить автообучение" : "Включить автообучение"}
      </motion.button>

      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-lg font-medium mb-4 w-full sm:w-auto"
      >
        <p>Знания: {knowledge}</p>
        <p>Уровень престижа: {prestigeLevel}</p>
      </motion.div>

      <ProgressBar />

      <motion.button
        onClick={resetProgress}
        className="bg-red-600 hover:bg-red-500 text-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 mb-4 mt-6 w-full sm:w-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Сбросить прогресс и увеличить уровень престижа
      </motion.button>
    </div>
  );
}

export default App;

