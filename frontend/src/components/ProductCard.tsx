import React, { useState } from 'react'
import { useProductStore } from '@/store/product';
import { Box, Heading, Image, Text, 
	HStack, IconButton,
	Input, Button, CloseButton, 
	VStack, Dialog, Portal } from '@chakra-ui/react';
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { toaster } from "@/components/ui/toaster";

interface Product {
  _id?: string; // Optional for new products not yet saved
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {

  const [updatedProduct, setUpdateProduct] = useState(product);

  const {updateProduct} = useProductStore();

  const handleUpdateProduct = async () => {
    if (!updatedProduct._id) return;
    const {success, message} = await updateProduct(updatedProduct._id, updatedProduct);

    toaster.create({
  		description: message,
  		type: success ? 'success' : 'error',
  		closable: true,
    });
	setTimeout(() => {
		toaster.dismiss();
	}, 3000);
  };

  	const [open, setOpen] = useState(false)

	const {deleteProduct} = useProductStore();

	const handleDelete = async (id?: string) => {
		if (!id) return;
		const {success, message } = await deleteProduct(id);
    	toaster.create({
      		description: message,
      		type: success ? 'success' : 'error',
      		closable: true,
    	});
    	setTimeout(() => {
      		toaster.dismiss();
    	}, 3000);
  	};
  	const handleOpen = () => {
  	};
  return (
	<Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
	<Box 
		shadow='lg' 
		borderRadius='md' 
		overflow='hidden' 
		transition='all 0.3s'
		_hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
		bg={'white'}
		m={2} 
		p={2}>
	  	<Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
	  	<Box p={4}>
			<Heading as='h3' size='md' color='gray.600' mb={2}>
				{product.name}	
			</Heading>
			<Text textStyle='lg' fontWeight='bold' color='gray.600' mb={4}>
				${product.price.toFixed(2)}
			</Text>
			<HStack>
				<Dialog.Trigger asChild>
					<IconButton aria-label='Edit Product' colorScheme='blue' onClick={handleOpen}>
						<HiOutlinePencilAlt />
					</IconButton>
				</Dialog.Trigger>
				<IconButton aria-label='Delete Product' colorScheme='red' onClick={() => handleDelete(product._id)}>
					<HiOutlineTrash />
				</IconButton>
			</HStack>
		</Box>
      	<Portal>
        	<Dialog.Backdrop />
        	<Dialog.Positioner>
          		<Dialog.Content>
            		<Dialog.Header>
              			<Dialog.Title>Update {updatedProduct.name}</Dialog.Title>
            		</Dialog.Header>
            		<Dialog.Body>
									<Box w='full' bg='gray.600' p={6} borderRadius='lg' shadow='md'>
          					<VStack>
            					<Input
              						name='name'
              						placeholder='Product Name'
              						value={updatedProduct.name}
              						onChange={(e) => setUpdateProduct({ ...updatedProduct, name: e.target.value })}
              						mb={4} />
            					<Input
												name='price'
												placeholder='Price'
												type='number'
												value={updatedProduct.price}
												onChange={(e) => setUpdateProduct({ ...updatedProduct, price: parseFloat(e.target.value) })}
												mb={4} />
											<Input
												name='image'
												placeholder='Image URL'
												value={updatedProduct.image}
												onChange={(e) => setUpdateProduct({ ...updatedProduct, image: e.target.value })}
												mb={4} />
										</VStack>
									</Box>
            		</Dialog.Body>
            		<Dialog.Footer>
              			<Dialog.ActionTrigger asChild>
                			<Button variant="outline">Cancel</Button>
              			</Dialog.ActionTrigger>
              			<Dialog.ActionTrigger asChild>
              				<Button onClick={handleUpdateProduct}>Save</Button>
              			</Dialog.ActionTrigger>
            		</Dialog.Footer>
            		<Dialog.CloseTrigger asChild>
              			<CloseButton size="sm" />
								</Dialog.CloseTrigger>
							</Dialog.Content>
						</Dialog.Positioner>
      		</Portal>
				</Box>
    </Dialog.Root>
  );
};

export default ProductCard;