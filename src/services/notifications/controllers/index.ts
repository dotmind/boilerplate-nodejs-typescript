import { Request, Response } from 'express';

const getNotifications = (req: Request, res: Response) => {
  try {
    const { notifications } = req;

    return res.status(200).json({ data: { notifications }, success: true });
  } catch (err) {
    if (err instanceof TypeError || err instanceof Error) {
      return res.status(500).json({ message: err?.message, success: false });
    }

    return res.status(500).json({ message: 'Une erreur est survenue', success: false });
  }
};

export default {
  getNotifications,
};
