module.exports = function(sequelize,Sequelize){
    const DocsLog = sequelize.define("docs_log", {
        Id: {
            primaryKey: true,
            field: 'id',
            type: Sequelize.BIGINT,
            
          },
          docsLogTypeId:{
              field: "docs_log_type_id",
              type: Sequelize.BIGINT,
          },
          userId: {
            field: 'user_id',
            type: Sequelize.BIGINT,
          },
          documentationId: {
            field: 'doccumentation_id',
            type: Sequelize.BIGINT
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
     DocsLog.associate = function (models) {
        DocsLog.belongsTo(models.documentation,{foreignKey :"doccumentation_id"}); 
        DocsLog.belongsTo(models.docs_log_type,{foreignKey :"docs_log_type_id"});
        DocsLog.belongsTo(models.user,{foreignKey :"user_id"});    
    
   
    }
     return DocsLog;
}