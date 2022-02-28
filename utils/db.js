import mongoose from 'mongoose';

const connection = {};

const connect = async () => {
  // guard for connection is already setup
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }

  // guard
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect('mongodb://localhost/glory-clothes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
};
const disconnect = async () => {
  if (connection.isConnected) {
    await mongoose.disconnect();
    connection.isConnected = false;
  } else {
    console.log('not disconnected');
  }
};

const db = { connect, disconnect };
export default db;
