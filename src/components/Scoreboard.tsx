import React, { ReactNode } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

// Define the types for the columns and scores
type Column = {
  header: string;
  field: string;
};

type Score = {
  [key: string]: unknown;
};

type ScoreboardProps = {
  scores: Score[];
  title: string;
  columns: Column[];
};

const Scoreboard: React.FC<ScoreboardProps> = ({ scores, title, columns }) => {
  return (
    <div>
  <Text fontSize="2xl" fontWeight="bold">{title}</Text>
    <Table variant="simple">
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={index}>{column.header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {scores.map((score, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <Td key={colIndex}>{score[column.field] as ReactNode}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Scoreboard;
