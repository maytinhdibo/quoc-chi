module.exports = function(sequelize, Sequelize) {
  const Section = sequelize.define("section", {
    createdAt: {
      field: "created_at",
      type: Sequelize.DATE
    },
    updatedAt: {
      field: "updated_at",
      type: Sequelize.DATE
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    chapterId: {
      field: "chapter_id",
      type: Sequelize.STRING
    },
    reviewerId: {
      field: "reviewer_id",
      type: Sequelize.INTEGER
    }
  });

  Section.associate = function(models) {
    Section.belongsToMany(models.user, { through: models.sections_user });
    Section.belongsTo(models.chapter);

    Section.belongsTo(models.user, {
      foreignKey: "reviewer_id",
      targetKey: "id",
      as: "reviewer"
    });
  };

  return Section;
};
