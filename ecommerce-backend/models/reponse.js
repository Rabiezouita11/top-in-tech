
module.exports = (sequelize, Sequelize) => {
    const reponse = sequelize.define("reponse", {
      reponse : {
            type: Sequelize.STRING,
            allowNull: false
        },
        id_quiz: {
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
            
        },
        
    }
    ,

    {
        freezeTableName:true,
        timestamps: false
    }
    )

    return reponse;
};