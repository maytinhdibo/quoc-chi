module.exports = function (sequelize, Sequelize) { 
    const Organization = sequelize.define("organization", {
        id: {
            field : 'id',
            primaryKey: true,
            type: Sequelize.BIGINT
          },
          name: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
          },
          updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
          },
    });

    Organization.associate = function (models) {
        Organization.hasMany(models.user);
    };

    return Organization;
}