module.exports = function(sequelize,Sequelize){
    const SectionDraft = sequelize.define("section_draft", {
        id: {
            primaryKey: true,
            field: 'id',
            autoIncrement: true,
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
          name:{
            field: 'name',
            type: Sequelize.STRING,
          },
          description:{
            field: 'description',
            type: Sequelize.TEXT,
          },
          content:{
            field: 'content',
            type: Sequelize.TEXT,
          },
          published:{
            field: 'published',
            type: Sequelize.TEXT('tiny') ,
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
    SectionDraft.associate = function (models) {
        SectionDraft.belongsTo(models.section,{foreignKey :"section_id"}); 
        SectionDraft.belongsTo(models.user,{foreignKey :"user_id"});
        //SectionDraft.hasMany(models.section);
    }
     return SectionDraft;
}