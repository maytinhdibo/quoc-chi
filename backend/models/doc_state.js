module.exports = function (sequelize, Sequelize) {
    const DocState = sequelize.define("doc_state", {
      Id: {
        primaryKey: true,
        field: 'id',
        type: Sequelize.BIGINT,
        
      },
    
      name: {
        field: 'name',
        type: Sequelize.STRING,
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
    },
    );
  
    DocState.associate = function (models) {
        DocState.hasMany(models.documentation);    
    }
  
    return DocState;
  }