import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser';

import path from 'path';

import cors from "cors";

//configure env
dotenv.config();

//databse config
connectDB();

const __dirname = path.resolve();

//rest object
const app = express();

//middelwares




app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());


import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import listingRouter from './routes/listing.route.js'


//routes


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
