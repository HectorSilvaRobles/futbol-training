require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


// Connecting Mongoose Database
mongoose.connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('MongooDB connected'))
.catch(err => console.log('there was an error', err))


// Coach User endpoints
app.use('/api/coach-users', require('./apiRoutes/coach_user_route'));

app.use('/api/athletes', require('./apiRoutes/athlete_route'));


const port = process.env.PORT || 4000

app.listen(port, () => console.log(`server running on port ${port}`))
