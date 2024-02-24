const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/error-handler.middleware');
const connectDB = require('./config/db');


const app = express();

//load environnement variables 
dotenv.config();

//establish the connection to mongodb
connectDB(process.env.MONGO_DB_NAME);

//enable cors
app.use(cors({
    methods: '*'
}));

//parse request
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware for routing
//app.use('/api/v1/users', require('./routes'));
app.use('/api/v1/users', require('./routes/user.route'));
app.use('/api/v1/profile', require('./routes/profile.route'));
app.use('/api/v1/appointment', require('./routes/appointment.route'));


//errror handling middleware
app.use(errorHandler);


//Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});



