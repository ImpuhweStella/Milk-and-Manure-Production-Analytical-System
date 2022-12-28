import  express  from "express";
import mongoose from "mongoose";
import cors from "cors";
// import index from "./routes/index";
import bodyParser from "body-parser";
import AdminRoute from "./routes/RABAdminRoute";
import CredentialsRoute from "./routes/CredentialsRoute";
import FarmersRoute from "./routes/FarmersRoutes";
import VeterinaryRoute from "./routes/VeterinaryRoute";


const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use("/",index)

app.use("/admins", AdminRoute);
app.use("/credentials",CredentialsRoute);
app.use("/farmers",FarmersRoute);
app.use("/veterinaries",VeterinaryRoute);


mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost:27017/RAB", {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{console.log("Database connected successfully")});

const port = process.env.PORT || 4500;

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});


export default express;