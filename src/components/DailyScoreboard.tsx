import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Scoreboard from './Scoreboard';
import { ScoreEntry } from '../utils/types';
import { Box } from '@chakra-ui/react';


const DailyScoreboard = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { data, error } = await supabase
        .from('scores')
        .select('*')
        .gte('date', today.toISOString())
        .lt('date', tomorrow.toISOString());

      if (error) {
        console.error('Error fetching scores:', error);
      } else {
        setScores(data);
      }
    };

    fetchScores();
  }, []);

 // Define columns for the daily scoreboard
 const columns = [
  { header: 'Player Name', field: 'playerName' },
  { header: 'Score', field: 'score' },
  { header: 'Attempts', field: 'attempts' }
];

  




  
return (
  <Box overflowX="auto">
    <Box width="100%" maxWidth="1200px" minWidth="800px" margin="0 auto">
      

      <Scoreboard scores={scores} title="Daily Scoreboard" columns={columns} />

  </Box>
</Box>);
};

export default DailyScoreboard;