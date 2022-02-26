import express, { Application } from 'express';

const router = express.Router();

export default (app: Application) => {
  app.use('/api/v1/notification', router);

  router.get(
    '/',
    (_req, res) => {
      res.status(201).json({ message: 'Yes', success: true });
    },
  );
};
