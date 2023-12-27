import { ChakraProvider, Flex, VStack } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScoreForm from './components/ScoreForm';
import ScoreboardTabs from './components/ScoreboardTabs';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Flex direction="column" minHeight="10vh" align="center" justify="center">
          <VStack spacing={2} maxWidth="4xl" width="full" px={4}>
            <ScoreForm />
            <ScoreboardTabs />
          </VStack>
        </Flex>
      </Router>
    </ChakraProvider>
  );
};

export default App;
