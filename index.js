
import express from 'express';
import { config } from "dotenv";
import mongoose from 'mongoose';
import bookRoute from "./route/book.route.js"
import userRoute from "./route/user.route.js"
import cors from "cors"
import path from 'path'
                                         
const app = express()


app.use(cors());
app.use(express.json())

config();


const PORT = process.env.PORT || 4000;

const URI = process.env.MONGODBURI;


try {
    mongoose.connect(URI,{
            useNewUrlParser:true,
            useUnifiedTopology: true
    });
    console.log("Connected to monogoDB  ")
} catch (error) {
    console.log("ERROR: ",error)

}
;
app.use("/book",bookRoute)
app.use("/user",userRoute)

const __dirname = path.resolve();

app.get("/",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"Frontend","dist")));
  res.sendFile(path.resolve(__dirname,"Frontend","dist","index.html"))

})
    



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})