import { motion } from 'framer-motion';
import { useAIStore } from '../store/useAIStore';

const ProgressBar = () => {
  const { progressToPrestige } = useAIStore((state) => state);

  return (
    <div className="relative w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 h-6 bg-gray-300 rounded-full overflow-hidden mt-4">
      <motion.div
        className="h-full bg-fuchsia-900"
        style={{ width: `${progressToPrestige}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progressToPrestige}%` }}
        transition={{ duration: 0.5 }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
        {Math.round(progressToPrestige)}%
      </span>
    </div>
  );
};

export default ProgressBar;