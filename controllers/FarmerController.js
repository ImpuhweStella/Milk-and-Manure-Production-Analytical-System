import Farmer from "../models/FarmerModel";


class FarmerController {

    static async createFarmer(req, res) {
        try {

            const farmer = new Farmer({
                
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                district:req.body.district,
                sector:req.body.sector,
                cell:req.body.cell

            })
            await farmer.save();
            return res.send({ message: "Account Created!!!", FarmerDetails: farmer})
        } catch (error) {
            return res.send({ message: "there is an error in creating an account!!!" })
        }

    }
    // static async adminLogin(req,res){
    //     try{
    //         const email=req.body.email;
    //         const passwword= req.body.password;
    //         const hashedPassword = bcrypt.hashSync(passwword,10);
    //         const findAdmin = await Admin.findOne({email:email});
    
    //         if(findUser){
    //             const isPasswordValid = bcrypt.compareSync(passwword,findAdmin.password);
    //             if(isPasswordValid){
    //                 const token =  jwt.sign({email:findAdmin.email},"secret-key",{expiresIn:"1h"});
    //                return res.send({message:"Logged In",data:token}); 
    //             }else{
    //                return  res.status(404).send({message:"Incorrect Email or Password!"});   
    //             }
           
    //         }else{
    //         res.status(404).send({message:"Incorrect Email or Password!"});
    //         }
    
    //     }catch(error){
    //         return res.send({message:"Error",data:error.message})  
    //     }
    // }

    static async getAllFarmers(req, res) {
        const farmer = await Farmer.find();
        if (!farmer) {
            return res.status(404).json({ error: "farmer doesn't exist!!!" })
        }
        return res.status(200).json({ message: "get all farmers successfully", Farmer: farmer })
    }

    static async UpdateFarmer(req, res) {
        const FarmerUpdate = await Farmer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!FarmerUpdate) {
            return res.status(404).json({ error: "there is an error in updating!!!" })
        }
        return res.status(200).json({ message: "updating Farmer Successfully", Farmer: FarmerUpdate })
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
export default FarmerController;