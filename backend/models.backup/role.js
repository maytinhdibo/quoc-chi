module.exports = function (sequelize, Sequelize) { 
    const Role = sequelize.define("role", {
          name: {
            type: Sequelize.STRING,
          }
    },
    {timestamps: false});

    Role.associate = function (models) {
      Role.belongsToMany(models.user,{ through: models.users_role });
    }
    
    return Role;
}