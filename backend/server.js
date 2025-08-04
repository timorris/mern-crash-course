import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows us to parse JSON request bodies

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});