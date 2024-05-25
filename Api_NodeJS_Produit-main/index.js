const express = require('express')
const mongoose = require('./DB/ConnectionDB');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ProduitService = require('./Routers/Produit');
const authRouter = require('./Routers/user');
const authenticate = require('./config/authentificate');
const dotenv = require('dotenv');
const app = express();


const cors = require('cors')
const port = 3000
dotenv.config();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200'  
  }));

app.use( '/api' , authenticate, ProduitService );
app.use('/uploads', express.static('uploads'));

app.use(express.static('public')); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.listen(  
    3000 
    ,
    ()=>{
        console.log(`server work !!!! on ${port}`);
    }
    
);