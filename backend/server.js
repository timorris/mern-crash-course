import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import cors from 'cors';

const app = express();

app.use(cors()); // enables CORS for all routes

/*
const allowedOrigins = [process.env.ORIGIN]; // replace with your frontend URL
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    preflightContinue: true,
    optionsSuccessStatus: 200, // for legacy browser support
};

app.use(cors(corsOptions));
*/

/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
    next();
});
*/

/*
app.use(cors({
    origin: '*',
	//methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	methods: 'GET, POST, PUT, DELETE, OPTIONS',
    //preflightContinue: true,
    //optionsSuccessStatus: 200, // for legacy browser support
}));
*/


app.use(express.json()); // allows us to parse JSON request bodies

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});