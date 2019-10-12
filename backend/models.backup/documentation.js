module.exports = function (sequelize, Sequelize) { 
    const Organization = sequelize.define("organization", {
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
          },
          updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
          },
        name: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
        },
    });

    Organization.associate = function (models) {
        Organization.hasOne(models.user);
    };

    return Organization;
}