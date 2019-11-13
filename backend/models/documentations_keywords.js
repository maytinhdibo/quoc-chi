module.exports = function (sequelize, Sequelize) { 
    const DocumentationsKeywords = sequelize.define("documentations_keywords", {
        keywordid: {
            type: Sequelize.BIGINT,
            field: 'keyword_id',
          },
          sectionid: {
            type: Sequelize.BIGINT,
            field: 'section_id',
          },
          },
    {timestamps: false});
    DocumentationsKeywords.associate = function(models) {
        DocumentationsKeywords.belongsTo(models.key);
        DocumentationsKeywords.belongsTo(models.documentation);
      };
    
    return DocumentationsKeywords;
}