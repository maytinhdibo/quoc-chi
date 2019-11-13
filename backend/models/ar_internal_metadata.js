module.exports = function(sequelize, Sequelize) {
    const Type = sequelize.define(
      "ar_internal_metadata",
      {
        key: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        value: {
            type:  Sequelize.STRING,
        },
        createdAt: {
          field: 'created_at',
          type: Sequelize.DATE,
        },
        updatedAt: {
          field: 'updated_at',
          type: Sequelize.DATE,
        },
      },
    
    );
  
    return Type;
  };
  