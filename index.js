const cookieParser = require('cookie-parser');
const express = require('express');

require('dotenv').config();
const app = express();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//cookie middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//user routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { post } = require('./prisma');
app.use('/api', userRoutes);
app.use('/api', postRoutes);


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});


