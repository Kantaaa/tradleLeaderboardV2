import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DailyScoreboard from './components/DailyScoreboard';
import WeeklyScoreboard from './components/WeeklyScoreboard';
import MonthlyScoreboard from './components/MonthlyScoreboard';


const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<DailyScoreboard />} />
          <Route path="/weekly" element={<WeeklyScoreboard />} />
          <Route path="/monthly" element={<MonthlyScoreboard />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
