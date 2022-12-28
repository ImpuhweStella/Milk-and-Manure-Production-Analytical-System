import mongoose from "mongoose";

const VeterinarySchema = mongoose.Schema({
    
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    district:{type:String,require:true},
    email: {type: String, required: true},
    password: {type: String, required: true}
    
})

export default mongoose.model("Veterinary",VeterinarySchema );