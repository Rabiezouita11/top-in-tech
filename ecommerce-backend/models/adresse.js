
module.exports = (sequelize, Sequelize) => {
    const Adresse = sequelize.define("adresse", {
        code_postale: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rue: {
            type: Sequelize.STRING,
            allowNull: false
        },
        numero_boite_lettre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ville: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
     
           
        
    },
    {
        freezeTableName:true,
        timestamps: false
    }
    )
 
      

    return Adresse;
};