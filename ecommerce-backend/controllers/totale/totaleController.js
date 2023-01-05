const { produit , commande, quiz, contact , rate } = require("../../models");






const countProduit = async (req, res, next) => {
    try {
        const count = await produit.count();
        if (count) {
        return res.status(200).json(count);
        }
    } catch (error) {
        console.log(error.message);
    }
    }

    const countCommande = async (req, res, next) => {

    try {
        const count = await commande.count();
        if (count) {
        return res.status(200).json(count);
        }
    } catch (error) {
        console.log(error.message);
    }
    }

    const countQuiz = async (req, res, next) => {

    try {
        const count = await quiz.count();
        if (count) {
        return res.status(200).json(count);
        }
    } catch (error) {
        console.log(error.message);
    }
    }

    const countContact = async (req, res, next) => {

    try {
        const count = await contact.count();
        if (count) {
        return res.status(200).json(count);
        }
    } catch (error) {
        console.log(error.message);
    }
    }

const countrate = async (req, res, next) => {
const { idproduits } = req.params;
   //how count  noter in rate 
    try {
        const counts = await rate.count({
            where: { id_produit: idproduits },
        });
        if (counts) {
        return res.status(200).json(counts);
        }
    } catch (error) {
        console.log(error.message);
    }
    }



    const afficheRate = async (req, res, next) => {
        const { idproduits } = req.params;
        
        try {
            const counts = await rate.findAll(
                {

                include: {
                    model: produit,
                    attributes: ["nom"],
                },
                // how count the rate   
              
            

                where: { id_produit: idproduits },
            }
                
            );
            if (counts) {
            return res.status(200).json(counts);
            }
        } catch (error) {
            console.log(error.message);
        }
        }

    module.exports = { countProduit, countCommande, countQuiz, countContact , afficheRate , countrate };