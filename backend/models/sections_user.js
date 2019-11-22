module.exports = function (sequelize, Sequelize) {
  const SectionUser = sequelize.define("sections_user", {
    sectionId: {
      field: 'section_id',
      type: Sequelize.BIGINT,
    },
    userId: {
      field: 'user_id',
      type: Sequelize.BIGINT,
    }
  },
    { timestamps: false }
  );

  SectionUser.associate = function (models) {
    SectionUser.belongsTo(models.user, {foreignKey : "user_id"});
    SectionUser.belongsTo(models.section,{foreignKey: "section_id"});
  }

  return SectionUser;
}