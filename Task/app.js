import express from 'express';
import dotenv from 'dotenv'
import  userRouter  from './Router/user_route.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import webhookroute from './Router/webhookroute.js';

dotenv.config();

const app = express();

app.use("/stripe", webhookroute);


app.use(cookieParser())

app.use(cors({
    origin : 'http://localhost:5173',
    credentials:true
}))
app.use(express.json())

app.use('/api', userRouter)
app.get('/',(req,res)=>{
    res.send("API is running")
})

export default app;

