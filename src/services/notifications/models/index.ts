import { Schema, model } from 'mongoose';

import { DATE_REQUIRED, STRING_REQUIRED } from '@services/internal/helpers/mongo';

export interface Notification {
  id: string;
  message: string;
  date: Date;
}

const notificationSchema = new Schema<Notification>({
  message: STRING_REQUIRED,
  date: DATE_REQUIRED,
}, {
  toJSON: {
    transform(_doc, ret) {
      const { _id, __v, ...rest } = ret;

      return {
        id: _id,
        ...rest,
      };
    },
  },
});

export default model<Notification>('Notification', notificationSchema);
