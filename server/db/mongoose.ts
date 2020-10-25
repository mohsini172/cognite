import mongoose from 'mongoose';
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// var options = {
// 	keepAlive: 300000,
// 	connectTimeoutMS: 30000,
//     user: "admin",
// 	pass: "Pa$$w0rd!",
// };
mongoose.connect("mongodb://admin:Pa$$w0rd!@ds261247.mlab.com:61247/congnite");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("mongodb connected");
});

module.exports = mongoose;