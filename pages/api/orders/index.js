import nc from 'next-connect';
import Order from '../../../models/Orders';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});

handler.use(isAuth); //middleware work before the handler below.

handler.post(async (req, res) => {
try {
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: req.user._id,
  });
  const order = await newOrder.save();

  res.status(201).send(order);
} catch(err) {
  res.status(401).send({message: err})

}
});

export default handler;
