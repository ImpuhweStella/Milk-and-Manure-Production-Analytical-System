import Credentials from "../models/Credentials";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


class CredentialsController {

    static async createCredential(req, res) {
        try {

            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const credentials = new Credentials({
                email: req.body.email,
                password: hashedPassword,

            })
            await credentials.save();

            const token = jwt.sign({ email: Credentials.email }, "secret-key", { expiresIn: "1h" });
            return res.send({ message: "Account Created!!!", data: token })
        } catch (error) {
            return res.send({ message: "there is an error in creating an account!!!", data: error.message })
        }
    };

    static async credLogin(req, res) {
        try {
            const email = req.body.email;
            const passwword = req.body.password;
            const hashedPassword = bcrypt.hashSync(passwword, 10);
            const findCred = await Credentials.findOne({ email: email });

            if (findCred) {
                const isPasswordValid = bcrypt.compareSync(passwword, findCred.password);
                if (isPasswordValid) {
                    const token = jwt.sign({ email: findCred.email }, "secret-key", { expiresIn: "1h" });
                    return res.send({ message: "Logged In", data: token });
                } else {
                    return res.status(404).send({ message: "Incorrect Email or Password!" });
                }

            } else {
                res.status(404).send({ message: "Incorrect Email or Password!" });
            }

        } catch (error) {
            return res.send({ message: "Error", data: error.message })
        }
    };


    static async UpdateCredential(req, res) {
        const CredentialUpdate = await Credentials.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!CredentialUpdate) {
            return res.status(404).json({ error: "there is an error in updating!!!" })
        }
        return res.status(200).json({ message: "updating credentials Successfully", Credential: CredentialUpdate })
    };


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

export default CredentialsController;


