import express from 'express';

const app = express();

app.get('/', (request, response) => response.json({ info: 'OK!' }));

app.get('/info', (request, response) => response.json({ version: '1.0' }));

app.listen(3030);
// eslint-disable-next-line no-console
console.log('>> http://localhost:3030');
