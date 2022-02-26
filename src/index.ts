import express from 'express';

import '@core/env';
import loaders from '@core/loaders';

const app = express();

loaders(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Server listen on localhost:${PORT}`);
});
