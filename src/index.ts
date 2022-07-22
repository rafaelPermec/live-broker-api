import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { ErrorMiddleware, ValidationMiddleware } from './middlewares';
import { ContasRoutes, LoginRoutes } from './routes';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

app.use('/login', LoginRoutes);
app.use('/conta', ContasRoutes);
app.use(ValidationMiddleware);

app.use(ErrorMiddleware);

app.listen(PORT, () => console.log(`Estamos presentes em http://localhost:${PORT}`));
