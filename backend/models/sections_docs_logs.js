module.exports = function(sequelize, Sequelize) {
  const sectionsDocsLogs = sequelize.define(
    "sections_docs_logs",
    {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        field: "id",
        autoIncrement: true,
      },
      sectionId: {
        type: Sequelize.BIGINT,
        allowNull: true,
        field: "section_id"
      },
      documentationId: {
        type: Sequelize.BIGINT,
        allowNull: true,
        field: "documentation_id"
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "created_at"
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "updated_at"
      },
      logType: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: "1",
        field: "log_type"
      },
      sectionsLogId: {
        type: Sequelize.BIGINT,
        allowNull: true,
        field: "sections_log_id"
      }
    },
    {
      tableName: "sections_docs_logs"
    }
	);
	
	sectionsDocsLogs.associate = function (models) {
    sectionsDocsLogs.belongsTo(models.section);
    sectionsDocsLogs.belongsTo(models.documentation);
    sectionsDocsLogs.belongsTo(models.sections_log, { forginKey : "sections_log_id"});

  }

  return sectionsDocsLogs;
};
