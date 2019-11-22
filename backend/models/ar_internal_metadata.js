module.exports = function (sequelize, Sequelize) {
    //usercreate 
    const ArInternalMetadata = sequelize.define("ar_internal_metadata", {
        key: {
            primaryKey: true,
            type: Sequelize.STRING,

        },
        value: {
            type: Sequelize.STRING,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: "created_at"
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: "updated_at"
          },
    });

   

    return  ArInternalMetadata;
}
