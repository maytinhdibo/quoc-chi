
module.exports = function(sequelize, Sequelize) {
  //usercreate
  const User = sequelize.define("user", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      field:"id",
      type: Sequelize.BIGINT
    },
    name: {
      field:"name",
      type: Sequelize.STRING
    },
    password:{
      field: "password",
      type: Sequelize.STRING,
    },
    createdAt: {
      field: "created_at",
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      field: "updated_at",
      type: Sequelize.DATE,
      allowNull: false,
    },
    
    email: {
      field: "email",
      type: Sequelize.STRING,
      allowNull: false,
    },
    encrypted_password: {
      field: "encrypted_password",
      type: Sequelize.STRING
    },
    reset_password_token: {
      field:"reset_password_token",
      type: Sequelize.STRING
    },
    reset_password_sent_at: {
      field:"reset_password_sent_at",
      type: Sequelize.DATE
    },
    remember_created_at: {
      field:"remember_created_at",
      type: Sequelize.DATE
    },
  
    academicTitleId: {
      field: "academic_title_id",
      type: Sequelize.BIGINT
    },
    organizationId: {
      field: "organization_id",
      type: Sequelize.BIGINT
    },  
    phone: {
      field:"phone",
      type: Sequelize.STRING
    },
    descriptions:{
      field:"descriptions",
      type: Sequelize.STRING
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
    User.hasMany(models.docs_log);
    User.hasMany(models.section_draft);
    User.hasMany(models.sections_log);
    User.hasMany(models.documentation);
  };

  return User;
};


