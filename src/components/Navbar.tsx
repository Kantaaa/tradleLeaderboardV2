
import React from 'react';
import {
  Box,
  Flex,
  Heading,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';

const Navbar = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.600', 'white');

  return (
    <Box bg={bg} color={color} boxShadow="sm">
      <Container maxW="container.xl">
        <Flex direction="column" align="center" justify="center" m={4}>
        <Heading mb={6}>TradleScoreboard</Heading> 
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
