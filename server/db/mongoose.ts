import mongoose from 'mongoose';
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(
  "mongodb+srv://admin:Pa$$w0rd!@cluster0.b3rgd.mongodb.net/cognite?retryWrites=true&w=majority"
);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("mongodb connected");
});

module.exports = mongoose;