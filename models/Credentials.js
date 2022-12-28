import mongoose from "mongoose";

const CredentialSchema = mongoose.Schema({
     
    email: {type: String, required: true},
    password: {type: String, required: true}

})

export default mongoose.model("Credential",CredentialSchema);
