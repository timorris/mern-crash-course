import { getEnvValue, getSecret } from "./util.js";
import mongoose from "mongoose";

const secretLocation = getEnvValue('KEYVAULT_URL') ? 'keyvault' : 'env';

export const connectDB = async () => {
    try {
        const dbUrl = secretLocation === 'keyvault' ? await getSecret('mongo-uri') : undefined;

        const conn = await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // 1 indicates an error, 0 indicates success
    }
}