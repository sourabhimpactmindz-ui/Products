import app from  "./app.js";
import connectdb from "./config/user_db.js";
const PORT = process.env.PORT || 3000

const runserver = async() =>{
    await connectdb();
    app.listen(PORT,() =>{
        console.log(`Server is running on ${PORT}`)
    })
}

runserver();