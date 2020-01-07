module.exports = function (sequelize, Sequelize) { 
    const Organization = sequelize.define("organization", {
        id: {
            field : 'id',
            primaryKey: true,
            type: Sequelize.BIGINT,
            autoIncrement: true,
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
            allowNull: false,
          },
          updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
            allowNull: false,
          },
    });

    Organization.associate = function (models) {
        Organization.hasMany(models.user);
    };

    return Organization;
}