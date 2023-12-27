import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Scoreboard from './Scoreboard'; // Import the common Scoreboard component
import { Box } from '@chakra-ui/react';

const MonthlyScoreboard = () => {
  const [scores] = useState([]);

  useEffect(() => {
    // Fetch and process monthly scores
  }, []);

  // Define columns for the monthly scoreboard
  const columns = [
    { header: 'Player Name', field: 'playerName' },
    { header: 'Total Score', field: 'totalScore' },
    { header: 'Average Attempts', field: 'averageAttempts' },
    { header: 'Games Played', field: 'gamesPlayed' }
  ];

  return (
    <Box overflowX="auto">
    <Box width="100%" maxWidth="1200px" minWidth="800px" margin="0 auto">
      <Scoreboard scores={scores} title="Monthly Scoreboard" columns={columns} />
    </Box>
    </Box>
  );
};

export default MonthlyScoreboard;
