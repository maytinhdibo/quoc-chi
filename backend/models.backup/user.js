const bcrypt = require("bcrypt");

module.exports = function(sequelize, Sequelize) {
  //usercreate
  const User = sequelize.define("user", {
    createdAt: {
      field: "created_at",
      type: Sequelize.DATE
    },
    updatedAt: {
      field: "updated_at",
      type: Sequelize.DATE
    },
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    encrypted_password: {
      type: Sequelize.STRING
    },
    academicTitleId: {
      field: "academic_title_id",
      type: Sequelize.INTEGER
    },
    organizationId: {
      field: "organization_id",
      type: Sequelize.INTEGER
    }
  });

  User.associate = function(models) {
    User.belongsTo(models.academic_title, { foreignKey: "academic_title_id" });
    User.belongsTo(models.organization);
    //m:n
    User.belongsToMany(models.book, { through: models.books_user });
    User.belongsToMany(models.role, { through: models.users_role });
    User.belongsToMany(models.section, { through: models.sections_user });
    User.belongsToMany(models.volume, { through: models.users_volume });
    //
    User.hasOne(models.section, { foreignKey: 'reviewer_id' });
  };

  return User;
};
