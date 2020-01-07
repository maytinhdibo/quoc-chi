module.exports = function (sequelize, Sequelize) { 
    const Volume = sequelize.define("volume", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.BIGINT
          },
          name: {
            type: Sequelize.STRING(4096),
        },
        description: {
            type: Sequelize.TEXT                        ,
        },
        introduction: {
            type: Sequelize.TEXT                        ,
        },
        cover: {
            type: Sequelize.TEXT                        ,
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
            allowNull: false,
          },
          updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
            allowNull: false,
          },
        
      
    });

    Volume.associate = function (models) {
        Volume.belongsTo(models.book);
        Volume.hasMany(models.chapter);
        Volume.belongsToMany(models.user,{ through: models.users_volume });
    };

    return Volume;
}