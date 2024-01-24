const express = require('express');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./config/connectDB');

// dotenv config
require('dotenv').config();

const app = express();

// connect db
connectDb();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use("/api/v1/users" , require("./routes/userRoute"));
app.use("/api/v1/transactions" , require("./routes/transactionRoute"))

const PORT = 8000 || process.env.PORT;

app.listen(PORT , ()=>{
    console.log(`Server started on port ${PORT}`.green.bold);
})