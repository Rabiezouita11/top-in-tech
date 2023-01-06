
module.exports = (sequelize, Sequelize) => {
    const rate = sequelize.define("rate", {
     id_user : {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
              },
              onUpdate: 'cascade',
              onDelete: 'cascade'  // Foreign key has an 'ON DELETE CASCADE' action
            
        },
        id_produit : {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        noter : {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        


     
        
    },
    
    


    
    {
        freezeTableName:true,
        timestamps: false
    },
    {

        onUpdate: 'cascade',
        onDelete: 'cascade'
    }
   
    
    )

    return rate;
};