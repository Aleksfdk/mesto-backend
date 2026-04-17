import { model, Schema } from 'mongoose';
import validator from 'validator';

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isURL(value),
      message: 'Некорректный формат ссылки',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

export default model('card', cardSchema);
