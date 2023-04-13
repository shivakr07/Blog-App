import  express from "express";
import dotenv from 'dotenv';
import connection from "./database/db.js";
import Router from './routes/route.js'
import cors from 'cors';
import bodyParser from "body-parser";
// now you need to intialize the dotenv 
dotenv.config();

const app = express();

app.use(cors()); 
app.use(bodyParser.json({extended : true}))
app.use(bodyParser.urlencoded({extended : true}))
app.use('/', Router);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`server is running successfully on port ${PORT}`);
})

const USER_NAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD ;
connection(USER_NAME, PASSWORD);