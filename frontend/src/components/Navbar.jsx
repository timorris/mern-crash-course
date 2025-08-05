import React from 'react';
import { Box, Container, Flex, Text, HStack } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { CgAddR } from "react-icons/cg";
import { Button } from '@chakra-ui/react';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex h={16} alignItems={'center'} 
        flexDir={{ base: 'column', sm: 'row' }}
        justifyContent={'space-between'}>
          <Text 
            bgGradient={'linear(to-1, #7928CA, #FF0080)'}
            bgClip={'text'}
            textAlign={"center"}
            fontSize={{ base: '22', sm: '28' }}
            fontWeight={'extrabold'}>
              <Link to={"/"}>Product Store <ShoppingCart fontSize={20} /></Link>
            </Text>
            <HStack spacing={2} alignItems={"center"}>
              <Link to={"/create"}>
                <Button>
                  <CgAddR fontSize={20} />
                </Button>
              </Link>
            </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;