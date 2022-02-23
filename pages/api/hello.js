// import db from '../../utils/db';

export default async function handler(req, res) {
  // try {
  //   await db.connect();
  // } catch (err) {
  //   console.log('connect error: ', err);
  // }

  // try {
  //   await db.disconnect();
  // } catch (err) {
  //   console.log('disconnect error', err);
  // }

  res.status(200).json({ name: 'John Doe' });
}
