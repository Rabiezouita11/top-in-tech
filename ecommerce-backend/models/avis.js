
module.exports = (sequelize, Sequelize) => {
    const avis = sequelize.define("avis", {
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
        message: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false
    }
    )

    return avis;
};