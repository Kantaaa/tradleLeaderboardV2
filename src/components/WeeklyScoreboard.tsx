import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { ScoreEntry } from '../utils/types';
import Scoreboard from './Scoreboard';
import { Box } from '@chakra-ui/react';

const WeeklyScoreboard = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      const today = new Date();
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 7);

      const { data, error } = await supabase
        .from('scores')
        .select('*')
        .gte('date', startOfWeek.toISOString())
        .lt('date', endOfWeek.toISOString());

      if (error) {
        console.error('Error fetching scores:', error);
      } else {
        setScores(data);
      }
    };

    fetchScores();
  }, []);

 // Define columns for the weekly scoreboard
 const columns = [
  { header: 'Player Name', field: 'playerName' },
  { header: 'Total Score', field: 'totalScore' },
  { header: 'Average Attempts', field: 'averageAttempts' },
  { header: 'Games Played', field: 'gamesPlayed' }
];

return (
  <Box overflowX="auto">
  <Box width="100%" maxWidth="1200px" minWidth="800px" margin="0 auto">
    <Scoreboard scores={scores} title="Weekly Scoreboard" columns={columns} />
  </Box>
</Box>);
};

export default WeeklyScoreboard;