import express from 'express';

const app = express();

app.get('/', (request, response) =>
  response.json({ message: 'Meu server Express, Typescript e ESLint! ' }),
);

app.listen(3333, () => {
  console.log('Back-end started in 3333 port!');
}
);
