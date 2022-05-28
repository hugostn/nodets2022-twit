import express from "express";

const app = express();

app.get('/', (request, response) => {
    return response.json({ info: 'OK!' });
});

app.get('/info', (request, response) => {
  return response.json({ version: '1.0' });
});

app.listen(3030);
console.log('>> http://localhost:3030');