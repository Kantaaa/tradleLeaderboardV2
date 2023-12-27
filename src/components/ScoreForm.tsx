import React, { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { Input, Button, useToast, Stack, Select, Box, Flex } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';
import { ScoreEntry } from '../utils/types';

const ScoreForm = () => {
  const [playerName, setPlayerName] = useState('');
  const [attempts, setAttempts] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const addScore = useStore((state) => state.addScore);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedPlayerName = playerName.trim().toLowerCase();
    const attemptsNumber = attempts === '7' ? 0 : 8 - parseInt(attempts);

    if (trimmedPlayerName && attempts) {
      // Check existing score
      const { data: existingScore } = await supabase
        .from('scores')
        .select('*')
        .eq('playerName', trimmedPlayerName)
        .eq('date', date);

      if (existingScore && existingScore.length > 0) {
        // Update existing score
        const { error } = await supabase
          .from('scores')
          .update({ score: attemptsNumber, attempts: parseInt(attempts) })
          .eq('playerName', trimmedPlayerName)
          .eq('date', date);

        if (error) {
          toast({
            title: 'Error updating score',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Score Updated',
            description: 'Your score for today has been updated.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          // Logic after updating score
        }
      } else {
        // Insert new score
        const newScore: ScoreEntry = {
          playerName: trimmedPlayerName,
          score: attemptsNumber,
          attempts: parseInt(attempts),
          date,
        };

        const { error } = await supabase
          .from('scores')
          .insert([newScore]);

        if (error) {
          toast({
            title: 'Error submitting score',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } else {
          addScore(newScore); // Update store
          toast({
            title: 'Score Submitted',
            description: 'Your score has been successfully submitted.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          // Reset form fields
          setPlayerName('');
          setAttempts('');
          setDate(new Date().toISOString().slice(0, 10));
        }
      }
    } else {
      toast({
        title: 'Error',
        description: 'Please fill out all fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

//<Box width="100%" maxWidth="1200px" minWidth="800px" margin="0 auto">

  return (
    <form onSubmit={handleSubmit}>
      <Flex align="center" justify="center" wrap="wrap" gap={4} > 
        <Box>
          <Input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Player Name"
          />
        </Box>
        <Box>
          <Select
            placeholder="Select attempts"
            value={attempts}
            onChange={(e) => setAttempts(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">Mission failed, better luck next time!</option>
          </Select>
        </Box>
        <Box>
          <Input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />
        </Box>
        <Button type="submit" colorScheme="blue">
          Submit Score
        </Button>
      </Flex>
    </form>
  );
};

export default ScoreForm;
