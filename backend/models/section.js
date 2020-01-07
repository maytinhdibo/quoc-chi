module.exports = function(sequelize, Sequelize) {
  const Section = sequelize.define("section", {
    
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    },
    chapterId: {
      field: "chapter_id",
      type: Sequelize.BIGINT
    },
    reviewerId: {
      field: "reviewer_id",
      type: Sequelize.BIGINT
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
    versionId: {
      field: "version_id",
      type: Sequelize.BIGINT
    },
    sectionStateId:{
      field: "section_state_id",
      type: Sequelize.BIGINT
    }
  });

  Section.associate = function(models) {
    Section.belongsToMany(models.user, { through: models.sections_user });
    Section.belongsTo(models.chapter, {foreignKey: "chapter_id"});

    Section.belongsToMany(models.documentation, {
      through: models.sections_docs_logs
    });

    Section.belongsTo(models.user, {
      foreignKey: "reviewer_id",
      targetKey: "id",
      as: "reviewer"
    });
    // Section.belongsToMany(models.keyword, {
    //   through: models.keyword_section
    // });
    Section.belongsTo(models.section_state, {foreignKey: "section_state_id"});
    Section.hasMany(models.sections_log);
    Section.hasMany(models.section_draft);

    //Section.belongsTo(models.section_draft, { foreignKey: "version_id"});

    };

  return Section;
};