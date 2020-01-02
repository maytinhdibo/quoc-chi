module.exports = function (sequelize, Sequelize) { 
    const Role = sequelize.define("role", {
      id: {
        field : 'id',
        primaryKey: true,
        type: Sequelize.BIGINT
      },
          name: {
            type: Sequelize.STRING,
          },
          resourceId: {
            field : 'resource_id',
            type: Sequelize.BIGINT
          },
          resource_type: {
            field : 'resource_type',
            type: Sequelize.STRING
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

    Role.associate = function (models) {
      Role.belongsToMany(models.user,{ through: models.users_role });
    }
    
    return Role;
}