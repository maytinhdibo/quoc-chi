
module.exports = function(sequelize, Sequelize) {
    //usercreate
    const KeyWord = sequelize.define("keyword", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        field: "created_at",
        type: Sequelize.DATE, 
        allowNull: false,
      },
      updatedAt: {
        field: "updated_at",
        type: Sequelize.DATE,
        allowNull: false,
      },
   
     
    });
  
    KeyWord.associate = function(models) {
        KeyWord.belongsToMany(models.documentation, {
            through: models.documentations_keyword
          });
          // KeyWord.belongsToMany(models.section, {
          //   through: models.keyword_section
          // });

    };
  
    return KeyWord;
  };
  