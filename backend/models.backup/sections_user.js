module.exports = function (sequelize, Sequelize) {
  const SectionUser = sequelize.define("sections_user", {
    sectionId: {
      field: 'section_id',
      type: Sequelize.INTEGER,
    },
    userId: {
      field: 'user_id',
      type: Sequelize.INTEGER,
    }
  },
    { timestamps: false }
  );

  SectionUser.associate = function (models) {
    SectionUser.belongsTo(models.user);
    SectionUser.belongsTo(models.section);
  }

  return SectionUser;
}