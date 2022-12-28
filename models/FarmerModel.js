import mongoose from "mongoose";

const FarmerSchema = mongoose.Schema({
    
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    district:{type:String, required:true},
    sector:{type:String, required:true},
    cell:{type:String,required:true}
    
})

export default mongoose.model("Farmer",FarmerSchema );