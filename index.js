import express from 'express'
import dotenv from 'dotenv'
import { connect } from './utils/dbconnection.util.js';
import { routes } from './routes/routes.js';

dotenv.config();

const app = express()

app.listen(process.env.PORT, async() => {
   console.log(`The server is Up and runing on http://localhost:${process.env.PORT}`)
   await connect(app)
   routes(app)
});