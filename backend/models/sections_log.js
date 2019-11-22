module.exports = function(sequelize, Sequelize){
    const SectionLog = sequelize.define(
        'sections_log',
    {
        id: {
            primaryKey: true,
            field: 'id',
            type: Sequelize.BIGINT,
            
          },
          sectionsLogTypeId:{
            field: "sections_log_type_id",
            type: Sequelize.BIGINT,
        },
          sectionId:{
              field: "section_id",
              type: Sequelize.BIGINT,
          },
          userId: {
            field: 'user_id',
            type: Sequelize.BIGINT,
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
    });
    SectionLog.associate = function (models) {
        SectionLog.belongsTo(models.sections_log_type, {forginKey : "sections_log_type_id"});
        SectionLog.hasMany(models.sections_docs_logs);
        SectionLog.belongsTo(models.section,{foreignKey :"section_id"}); 
        SectionLog.belongsTo(models.user,{foreignKey :"user_id"});

    }

    return SectionLog;
};