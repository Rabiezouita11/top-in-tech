const { user } = require("../../models");

const afficherClient = async (req, res, next) => {
  try {
    const clients = await user.findAll({
        where: { role: "user" },
    });
    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const banuser = async (req, res, next) => {

    try {
        let id = req.params.id;
        const userr = await user.findOne({where: {id: id}});
        if (!user) {
            return res.status(404).json({error: "user not found"});
        }
        if(userr.banier === "false") {
            await userr.update({banier: 'true'}, {where: {id: id}});
            return res.status(200).json({message: "userr banned"});
        }
        else if(userr.banier === "true") {
            await userr.update({banier: 'false'}, {where: {id: id}});
            return res.status(200).json({message: "userr unbanned"});
        }
    } catch (error) {
        return res.status(500).json({error: error.message});
    }

};

module.exports = {
  afficherClient,
  banuser,

};
