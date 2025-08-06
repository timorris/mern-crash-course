import React, { useEffect } from 'react';
import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useProductStore } from '@/store/product';
import ProductCard from '@/components/ProductCard';

const HomePage: React.FC = () => {

  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
    };
    loadProducts();
  }, [fetchProducts]);

  return (
    <Container>
      <VStack>
        <Text textStyle='4xl' 
          mt={4}
          color={'gray.500'}
          _hover={{ color: 'gray.400' }} 
          fontWeight={'bold'}>
            Current Products
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} w={"full"} mt={8}>
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          )) } 
        </SimpleGrid>
        {products.length === 0 && 
          <Text fontSize='xl' 
            color={'gray.500'}
            _hover={{ color: 'gray.400' }} fontWeight={'bold'}>
            No products found 🙄 {" "}
            <Link to={"/create"}>
              <Text as='span'
                color='blue.500'
                _hover={{ textDecoration: 'underline' }}>
                Create a Product
              </Text>
            </Link>
          </Text>
        }
      </VStack>
    </Container>
  );
};

export default HomePage;
