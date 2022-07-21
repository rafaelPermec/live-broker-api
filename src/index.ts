import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import ErrorMiddleware from './middlewares';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

app.get('/', (_request, response) => response.json(
  { message: 'Meu server Express, Typescript e ESLint! ' },
));

app.use(ErrorMiddleware);

app.listen(PORT, () => console.log(`Estamos presentes em http://localhost:${PORT}`));
