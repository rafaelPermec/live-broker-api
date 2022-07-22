import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import ErrorMiddleware from './middlewares';
import { ContasRoutes } from './routes';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

app.use('/clientes', ContasRoutes);

app.use(ErrorMiddleware);

app.listen(PORT, () => console.log(`Estamos presentes em http://localhost:${PORT}`));
