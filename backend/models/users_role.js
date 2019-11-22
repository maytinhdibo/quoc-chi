module.exports = function (sequelize, Sequelize) { 
    const UserRole = sequelize.define("users_role", {
          userId: {
            field: 'user_id',
            type: Sequelize.BIGINT,
          },
          roleId: {
            field: 'role_id',
            type: Sequelize.BIGINT,
          }
    },
    {timestamps: false});
    UserRole.associate = function(models) {
      UserRole.belongsTo(models.user, { foreignKey: "user_id" });
      UserRole.belongsTo(models.role, { foreignKey: "role_id" });

    };
    return UserRole;
}