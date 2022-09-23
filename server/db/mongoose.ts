import mongoose from 'mongoose';
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
import { MongoMemoryServer } from 'mongodb-memory-server';

// This will create an new instance of "MongoMemoryServer" and automatically start it
MongoMemoryServer.create().then(mongod => {
  const uri = mongod.getUri();
  mongoose.connect(
    uri
  );
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("mongodb connected");
});

module.exports = mongoose;