module.exports = function(sequelize, Sequelize) {
    const Type = sequelize.define(
      "ar_internal_metadata",
      {
        key: {
          type: Sequelize.VARCHAR(225),
          primaryKey: true,
        },
        value: {
            type:  Sequelize.VARCHAR(225),
        },
        created_at: {
            type:  Sequelize.DATETIME,
          },
        updated_at: {
            type:  Sequelize.DATETIME,
          },
      },
    
    );
  
    return Type;
  };
  