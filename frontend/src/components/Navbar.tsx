
import React from 'react';
import { Button, Container, Flex, Text, HStack } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { CgAddR } from "react-icons/cg";

const Navbar: React.FC = () => {

  return (
    <Container maxW={"1140px"} px={4} bg={'gray.900'}>
      <Flex h={16} alignItems={'center'} 
        flexDir={{ base: 'column', sm: 'row' }}
        justifyContent={'space-between'}>
        <Text textStyle='4xl' 
          color={'gray.500'}
          _hover={{ color: 'gray.400' }} fontWeight={'bold'}>
          <Link to={"/"}>Product Store</Link>
        </Text>
        <HStack alignItems={"center"}>
          <Link to={"/create"}>
            <Button bg={'gray.700'} color={'white'} 
              _hover={{ bg: 'gray.600' }}>
              <CgAddR fontSize={20} />
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
