import app from './server/app';

const port = 3030;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`>> http://localhost:${port}`));
