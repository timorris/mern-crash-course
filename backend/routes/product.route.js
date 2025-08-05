import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/product.controller.js';
//import cors from 'cors';

const router = express.Router();

/*
const corsOptions = {
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	preflightContinue: true,
	optionsSuccessStatus: 200, // for legacy browser support
};
*/

router.get('/', getProducts);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;