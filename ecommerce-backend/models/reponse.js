
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
            allowNull: false
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