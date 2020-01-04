module.exports = function (sequelize, Sequelize) {
    const DocsLogType = sequelize.define("docs_log_type", {
      Id: {
        primaryKey: true,
        field: 'id',
        type: Sequelize.BIGINT,
        autoIncrement: true,
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
  
    DocsLogType.associate = function (models) {
        DocsLogType.hasMany(models.docs_log);    
    }
  
    return DocsLogType;
  }