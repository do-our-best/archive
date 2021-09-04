const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const connect = () => {
    if (env !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect(config.url, {
        dbName: config.database
        // useNewUrlParser: true,
        // useCreateIndex: true,
    }, (error) => {
        if (error) {
            console.error('mongoDB connection error', error);
        } else {
            console.log('mongoDB connected successfully.')
        }
    });
};
mongoose.connection.on('error', (error) => {
    console.error('mongoDB connection error', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('mongoDB disconnected ❗ trying to re-connect');
    connect();
});

module.exports = connect;