import { SetStateAction, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import DailyScoreboard from './DailyScoreboard';
import WeeklyScoreboard from './WeeklyScoreboard';
import MonthlyScoreboard from './MonthlyScoreboard';

const ScoreboardTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: SetStateAction<number>) => {
    setTabIndex(index);
  };

  return (
    <Tabs index={tabIndex} onChange={handleTabsChange}>
      <TabList>
        <Tab>Daily</Tab>
        <Tab>Weekly</Tab>
        <Tab>Monthly</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <DailyScoreboard />
        </TabPanel>
        <TabPanel>
          <WeeklyScoreboard />
        </TabPanel>
        <TabPanel>
          <MonthlyScoreboard />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ScoreboardTabs;
