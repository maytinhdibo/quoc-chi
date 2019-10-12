module.exports = function (sequelize, Sequelize) { 
    const UserRole = sequelize.define("users_role", {
          userId: {
            field: 'user_id',
            type: Sequelize.INTEGER,
          },
          roleId: {
            field: 'role_id',
            type: Sequelize.INTEGER,
          }
    },
    {timestamps: false});
    
    return UserRole;
}