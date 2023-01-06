module.exports = (sequelize, Sequelize) => {
  const expererpanier = sequelize.define(
    "expererpanier",
    {
      date_expiration: {
        type: Sequelize.STRING,
        allowNull: false,
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
      date_expiration: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return expererpanier;
};
