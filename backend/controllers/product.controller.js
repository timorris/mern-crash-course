import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        console.error('Error in Get products:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body; // user will send product data in the request body

    if (!product || !product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'Invalid product data' });
    }

    // Create a new product instance
    const newProduct = new Product(product);

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json({ success: true, data: savedProduct });
    }
    catch (error) {
        console.error('Error in Create product:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error('Error in Update product:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error in Delete product:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}