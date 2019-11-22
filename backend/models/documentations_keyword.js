module.exports = function(sequelize, Sequelize){
    const DocKey= sequelize.define("documentations_keyword",{
        keywordId:{
            field:"keyword_id",
            type: Sequelize.BIGINT
        },
        documentationId: {
            field: 'doccumentation_id',
            type: Sequelize.BIGINT
          },
    },
    { timestamps: false });
    DocKey.associate = function(models) {
        DocKey.belongsTo(models.documentation,{foreignKey : "doccumentation_id"});
        DocKey.belongsTo(models.keyword,{ foreignKey: "keyword_id"});
    };

    return DocKey;
}