import create from 'zustand';
import { supabase } from '../supabaseClient';
import { ScoreEntry } from '../utils/types';

// Define the store state
type StoreState = {
  scores: ScoreEntry[];
  addScore: (newScore: ScoreEntry) => void;
  fetchScores: () => Promise<void>;  // Define the return type for fetchScores
};

// Create the store
export const useStore = create<StoreState>((set) => ({
  scores: [],
  addScore: (newScore) => set((state) => ({ scores: [...state.scores, newScore] })),
  fetchScores: async () => {
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .eq('date', today);
    if (error) {
      console.error('Error fetching scores:', error);
    } else {
      set({ scores: data || [] });  // Ensure data is an array
    }
  },
}));
