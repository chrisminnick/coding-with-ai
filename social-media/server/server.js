import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const port = process.env.SERVER_PORT || 8081;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
