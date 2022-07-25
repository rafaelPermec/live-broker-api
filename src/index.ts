import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { ErrorMiddleware, ValidationMiddleware } from './middlewares';
import { ContasRoutes, LoginRoutes, AtivosRoutes, InvestimentosRoutes } from './routes';
import swaggerDocs from './database/swagger.json';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/login', LoginRoutes);
app.use('/conta', ContasRoutes);
app.use(ValidationMiddleware);
app.use('/ativos', AtivosRoutes);
app.use('/investimentos', InvestimentosRoutes);

app.use(ErrorMiddleware);

app.listen(PORT, () => console.log(`Estamos presentes em http://localhost:${PORT}`));

export default app;
