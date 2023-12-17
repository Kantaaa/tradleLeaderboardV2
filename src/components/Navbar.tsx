
import React from 'react';
import {
  Box,
  Flex,
  Link,
  Heading,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.600', 'white');

  return (
    <Box bg={bg} color={color} boxShadow="sm">
      <Container maxW="container.xl">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Heading as="h1" size="lg">
            TradleScoreboard
          </Heading>
          <Flex alignItems={'center'}>
            <Link as={RouterLink} to="/" px={2}>
              Daily
            </Link>
            <Link as={RouterLink} to="/weekly" px={2}>
              Weekly
            </Link>
            <Link as={RouterLink} to="/monthly" px={2}>
              Monthly
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
