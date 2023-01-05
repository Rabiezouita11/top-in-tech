const { rate } = require("../../models");


const ajouterRate  = async (req, res, next) => {
    try {
        const {id_user,id_produit,noter} = req.body;
            const newrate = await rate.create({id_user,id_produit,noter});
            return res.status(200).json({message:"note ajoutée"});
        }
    catch (error) {
        console.log(error.message);
    }

  
}
const checkRateexistUser = async (req, res, next) => {
    try {
        const {id_user,id_produit} = req.parmas;
        const findrate = await rate.findOne({where:{id_user,id_produit}});
        if(findrate){
            return res.status(200).json({message:"rate exist"});
        } else {
            return res.status(200).json({message:"rate not exist"});

        }
    } catch (error) {
        console.log(error.message);
    }
}


const afficheRateparidproduit = async (req, res, next) => {
    try {
        const {id} = req.params || {id_produit:null};
        const findrate = await rate.findAll({where:{id_produit : id}});
        if(findrate){
            return res.status(200).json({findrate});
        } else {
            return res.status(200).json({message:"rate not exist"});
        }
    } catch (error) {
        console.log(error.message);
    }
}













module.exports = {
    ajouterRate
    ,checkRateexistUser
    ,afficheRateparidproduit

    };