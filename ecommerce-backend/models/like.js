
module.exports = (sequelize, Sequelize) => {
    const like = sequelize.define("like", {
    id_produit: {
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
    },
    {
         timestamps: false
    }
    )


    return like;
};