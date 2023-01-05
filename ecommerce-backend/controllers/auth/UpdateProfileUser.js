const { user } = require("../../models");

const bcrypt = require("bcrypt");

    
// let  User  = req.body;
// console.log(User.id);
// console.log(User.password);
// console.log(User.newpassword);

const changerpassword = async (req, res, next) => {
    try {
        let  User  = req.body;

        const Userr = await user.findOne ({
            where: {
                id: User.id,
            },  
        });
        if (!Userr) {
            return res.status(404).json({
                status: "error",
                message: "user not found",
            });
        }
        const isValidPassword = await bcrypt.compare(User.password, Userr.mot_de_passe);
        if (!isValidPassword) {
            return res.status(400).json({
                status: "error",
                message: "password not valid",
            });
        }
        const hashPassword = await bcrypt.hash(User.newpassword, 10);
        await user.update(
            {
                mot_de_passe: hashPassword,
            },
            {
                where: {
                    id: User.id,

                },
            }
        );
        return res.json({
            status: "success",
            message: "password updated",
        });
    } catch (error) {
       console.log(error.message);
    }
};


const UpdateProfileUser = async (req, res, next) => {
    
if (!req.file) {
    const { id } = req.body;
    const { email, cin, nom, prenom } = req.body;

    console.log(id);
    console.log(email);
    console.log(cin);
    const userUpdate = await user.update(
        {
            email: email,
            cin: cin,
            nom: nom,
            prenom: prenom,
         
        },
        {
            where: {
                id: id,
            },

        }
    );
    if (!userUpdate) {
        return res.status(404).json({ message: "utilisateur n'existe pas" });
    }
    return res.status(200).json({ message: "utilisateur modifie avec succes" });

}else{
    const { id } = req.body;
    const { email, cin, nom, prenom } = req.body;
    const userUpdate = await user.update(
        {
            email: email,
            cin: cin,
            nom: nom,
            prenom: prenom,
            image: req.file.path,
        },
        {
            where: {
                id: id,
            },

        }
    );
    if (!userUpdate) {
        return res.status(404).json({ message: "utilisateur n'existe pas" });
    }
    return res.status(200).json({ message: "utilisateur modifie avec succes" });
}
    
   
};


// how to get the image from the front end in the back end ?









module.exports = {

    UpdateProfileUser,
    changerpassword
    
};