module.exports = function (sequelize, Sequelize) { 
    const Volume = sequelize.define("volume", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.BIGINT
          },
          name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        introduction: {
            type: Sequelize.STRING,
        },
        cover: {
            type: Sequelize.STRING,
        },
        edit_rules:{
            field:"edit_rules",
            type: Sequelize.STRING
        },
        bookId: {
            field: 'book_id',
            type: Sequelize.BIGINT
        },
     
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
          },
          updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
          },
        
      
    });

    Volume.associate = function (models) {
        Volume.belongsTo(models.book);
        Volume.hasMany(models.chapter);
        Volume.belongsToMany(models.user,{ through: models.users_volume });
    };

    return Volume;
}