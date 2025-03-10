import { create } from "zustand";

interface AIState {
  knowledge: number;
  upgrades: number;
  autoLearn: boolean;
  prestigeLevel: number;
  resetProgress: () => void;
  increaseKnowledge: () => void;
  buyUpgrade: () => void;
  toggleAutoLearn: () => void;
  progressToPrestige: number;
}

let autoLearnInterval: NodeJS.Timeout | null = null;

export const useAIStore = create<AIState>((set) => {
  // Загружаем данные из LocalStorage, если они есть
  const savedKnowledge = localStorage.getItem("knowledge");
  const savedUpgrades = localStorage.getItem("upgrades");
  const savedPrestigeLevel = localStorage.getItem("prestigeLevel");

  return {
    knowledge: savedKnowledge ? parseInt(savedKnowledge) : 0,
    upgrades: savedUpgrades ? parseInt(savedUpgrades) : 0,
    prestigeLevel: savedPrestigeLevel ? parseInt(savedPrestigeLevel) : 0,
    autoLearn: false,
    progressToPrestige: 0,

    increaseKnowledge: () => set((state) => {
      const newKnowledge = state.knowledge + 1 + state.upgrades;
      localStorage.setItem("knowledge", newKnowledge.toString());
      const progress = newKnowledge >= 1000 ? 100 : (newKnowledge / 1000) * 100;
      set({ knowledge: newKnowledge, progressToPrestige: progress });
      return { knowledge: newKnowledge, progressToPrestige: progress };
    }),

    buyUpgrade: () => set((state) => {
      if (state.knowledge >= 10) {
        const newUpgrades = state.upgrades + 1;
        localStorage.setItem("upgrades", newUpgrades.toString());
        return { knowledge: state.knowledge - 10, upgrades: newUpgrades };
      }
      return state;
    }),

    toggleAutoLearn: () => set((state) => {
      if (state.autoLearn) {
        // Если автообучение было включено, то выключаем его
        if (autoLearnInterval) {
          clearInterval(autoLearnInterval);
          autoLearnInterval = null;
        }
      } else {
        // Включаем автообучение, если оно было выключено
        autoLearnInterval = setInterval(() => {
          set((state) => {
            const newKnowledge = state.knowledge + 1 + state.upgrades;
            localStorage.setItem("knowledge", newKnowledge.toString());
            const progress = newKnowledge >= 1000 ? 100 : (newKnowledge / 1000) * 100;
            set({ knowledge: newKnowledge, progressToPrestige: progress });
            return { knowledge: newKnowledge, progressToPrestige: progress };
          });
        }, 500); 
      }
      return { autoLearn: !state.autoLearn };
    }),

    resetProgress: () => set((state) => {
      if (state.knowledge >= 1000) {
        const newPrestigeLevel = state.prestigeLevel + 1;
        localStorage.setItem("prestigeLevel", newPrestigeLevel.toString());
        return {
          knowledge: 0,
          upgrades: 0,
          prestigeLevel: newPrestigeLevel,
          progressToPrestige: 0, // Сброс прогресса
        };
      }
      return state;
    }),
  };
});

