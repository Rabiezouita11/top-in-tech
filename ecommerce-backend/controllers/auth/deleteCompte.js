const {user} = require('../../models');
var date_ob = new Date();















const supprimerCompteparid = async (req, res, next) => {
    // how add 1 to day value   
    let  Compte  = req.body;
    var someDate = new Date();
    someDate.setDate(someDate.getDate() + 10); //number  of days to add, e.x. 15 days
    var dateFormated = someDate.toISOString().substr(0,10);
    console.log(dateFormated);
    console.log(Compte.id);

try {

    const userDelete = await user.update(
        {
            date_supprimer_compte: dateFormated,
        },
        {
            where: {
                id: Compte.id,
            },
        }
        
    );
    if (!userDelete) {
        return res.status(404).json({message: "utilisateur n'existe pas"});
    }
    return res.status(200).json({message: "utilisateur supprime avec succes"});
} catch (err) {
    return res.status(500).json({message: "erreur serveur"});

}

}





















module.exports = {
    supprimerCompteparid
};
