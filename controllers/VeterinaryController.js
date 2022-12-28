import Veterinary from "../models/VeterinaryModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import "dotenv/config"


class VeterinaryController {

    static async createVeterinary(req, res) {
        try {

            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const vet = new Veterinary({
                
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                district:req.body.district,
                email: req.body.email,
                password: hashedPassword,

            })
            await vet.save();
            let transporter = nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:process.env.AUTH_EMAIL,
                    pass:process.env.AUTH_PASS,
                }
            })

            //mail options
            const mailOptions={
                from:process.env.AUTH_EMAIL,
                to:vet.email,
                subject:"Here are Your Login credentials",
                html:`email:"" and Password:`
            };

            const token = jwt.sign({ email: Veterinary.email }, "secret-key", { expiresIn: "1h" });
            return res.send({ message: "Account Created!!!", data: token })
        } catch (error) {
            return res.send({ message: "there is an error in creating an account!!!", data: error.message })
        }

    }
    static async veterinaryLogin(req,res){
        try{
            const email=req.body.email;
            const passwword= req.body.password;
            const hashedPassword = bcrypt.hashSync(passwword,10);
            const findVeterinary = await Veterinary.findOne({email:email});
    
            if(findVeterinary){
                const isPasswordValid = bcrypt.compareSync(passwword,findVeterinary.password);
                if(isPasswordValid){
                    const token =  jwt.sign({email:findVeterinary.email},"secret-key",{expiresIn:"1h"});
                   return res.send({message:"Logged In",data:token}); 
                }else{
                   return  res.status(404).send({message:"Incorrect Email or Password!"});   
                }
           
            }else{
            res.status(404).send({message:"Incorrect Email or Password!"});
            }
    
        }catch(error){
            return res.send({message:"Error",data:error.message})  
        }
    }

    static async getAllVeterinaries(req, res) {
        const vet = await Veterinary.find();
        if (!vet) {
            return res.status(404).json({ error: "veterinary doesn't exist!!!" })
        }
        return res.status(200).json({ message: "get all veterinaries successfully!!!", Veterinary: vet })
    }

    static async UpdateVeterinary(req, res) {
        const VeterinaryUpdate = await Veterinary.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!VeterinaryUpdate) {
            return res.status(404).json({ error: "there is an error in updating!!!" })
        }
        return res.status(200).json({ message: "updating Veterinary Successfully", Veterinary: VeterinaryUpdate })
    }
    static async DeleteOneById(req, res) {

        {
            try {
                const doc = await Model.findById(req.params.id)
                if (!doc) {
                    return res.status(404).json({ message: "failed" })
                }
                return res.status(200).json({ message: "successfully", data: doc });
            } catch (error) {
                console.log(error)
            }
        }

    };

}
export default VeterinaryController;