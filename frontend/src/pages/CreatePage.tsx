import React from 'react';
import { useState } from 'react';
import { Box, Container, VStack, Heading, Input, Button, Text } from '@chakra-ui/react';
import { toaster } from "@/components/ui/toaster";
import { useProductStore } from '@/store/product';

const CreatePage: React.FC = () => {

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    image: ''
  });

  const {createProduct} = useProductStore();

  const handleAddProduct = async () => {
    const response = await createProduct(newProduct);

    toaster.create({
      description: response.message,
      type: response.success ? 'success' : 'error',
      closable: true,
    });
    setTimeout(() => {
      toaster.dismiss();
    }, 3000);
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack>
        <Text textStyle='4xl' 
          mt={4}
          mb={8}
          color={'gray.500'}
          _hover={{ color: 'gray.400' }} 
          fontWeight={'bold'}>
            Create New Product
        </Text>
        <Box w='full' bg='gray.600' p={6} borderRadius='lg' shadow='md'>
          <VStack>
            <Input
              name='name'
              placeholder='Product Name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              mb={4}
            />
            <Input
              name='price'
              placeholder='Price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              mb={4}
            />
            <Input
              name='image'
              placeholder='Image URL'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              mb={4}
            />
            <Button colorScheme='teal' width='full' onClick={handleAddProduct}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
