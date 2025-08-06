import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors()); // enables CORS for all routes

const __dirname = path.resolve();

app.use(express.json()); // allows us to parse JSON request bodies

app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});