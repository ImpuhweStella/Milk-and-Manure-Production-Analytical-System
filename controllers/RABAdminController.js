import Admin from "../models/RABAdminModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
// import "dotenv/config"


class RABAdminController {

    static async createAdmin(req, res) {
        try {

            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const admin = new Admin({
                
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                password: hashedPassword,

            })
            await admin.save();
            // let transporter = nodemailer.createTransport({
            //     service:"gmail",
            //     auth:{
            //         user:process.env.AUTH_EMAIL,
            //         pass:process.env.AUTH_PASS,
            //     }
            // })

            //mail options
            // const mailOptions={
            //     from:process.env.AUTH_EMAIL,
            //     to:admin.email,
            //     subject:"Here are Your Login credentials",
            //     html:`email: and Password:`
            // };

            const token = jwt.sign({ email: Admin.email }, "secret-key", { expiresIn: "1h" });
            return res.send({ message: "Account Created!!!", data: token })
        } catch (error) {
            return res.send({ message: "there is an error in creating an account!!!", data: error.message })
        }

    }
    static async adminLogin(req,res){
        try{
            const email=req.body.email;
            const passwword= req.body.password;
            const hashedPassword = bcrypt.hashSync(passwword,10);
            const findAdmin = await Admin.findOne({email:email});
    
            if(findAdmin){
                const isPasswordValid = bcrypt.compareSync(passwword,findAdmin.password);
                if(isPasswordValid){
                    const token =  jwt.sign({email:findAdmin.email},"secret-key",{expiresIn:"1h"});
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

    static async getAllAdmins(req, res) {
        const admin = await Admin.find();
        if (!admin) {
            return res.status(404).json({ error: "admin doesn't exist!!!" })
        }
        return res.status(200).json({ message: "get all admins successfully", Admin: admin })
    }

    static async UpdateAdmin(req, res) {
        const AdminUpdate = await Admin.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!AdminUpdate) {
            return res.status(404).json({ error: "there is an error in updating!!!" })
        }
        return res.status(200).json({ message: "updating Admin Successfully", Admin: AdminUpdate })
    }

}
export default RABAdminController;