
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
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
              },
              onUpdate: 'cascade',
              onDelete: 'cascade'  // Foreign key has an 'ON DELETE CASCADE' action
            
        }
     
           
        
    },
    {
        freezeTableName:true,
        timestamps: false
    }
    )
 
      

    return Adresse;
};