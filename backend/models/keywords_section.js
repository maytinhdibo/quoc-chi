module.exports = function(sequelize, Sequelize){
    const keywordSection= sequelize.define("keyword_section",{
        keywordId:{
            field:"keyword_id",
            type: Sequelize.BIGINT,
        },
        sectionId: {
            field: 'section_id',
            type: Sequelize.BIGINT,          },
    },
    { timestamps: false });
    keywordSection.associate = function(models) {
        keywordSection.belongsTo(models.section,{foreignKey : "section_id"});
        keywordSection.belongsTo(models.keyword,{ foreignKey: "keyword_id"});
    };

    return keywordSection;
}