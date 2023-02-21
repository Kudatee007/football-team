require("dotenv").config()
const express = require("express");
const app = express();
const PORT = 6300;
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const teamRouter = require("./routes/teamRouter")
const notFound = require("./middleware/notFound")




app.use(teamRouter)


// ERROR ROUTR
app.use(notFound)

const startServer = async () => {
    try {
        await mongoose.connect(process.env.DBS);
        app.listen(PORT, () => {
            console.log(`server running on ${PORT}........`);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer()