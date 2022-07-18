import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(helmet());

app.get('/', (_request, response) => response.json(
  { message: 'Meu server Express, Typescript e ESLint! ' },
));

app.listen(3000, () => console.log('Back-end started in 3000 port!'));
