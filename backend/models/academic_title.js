module.exports = function (sequelize, Sequelize) {
    //usercreate 
    const Title = sequelize.define("academic_title", {
       
          id: {
            primaryKey: true,
            field: 'id',
            type: Sequelize.BIGINT,
            
          },
        name: {
            type: Sequelize.STRING,
        },
        fullname: {
            type: Sequelize.STRING,
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

    Title.associate = function (models) {
        Title.hasMany(models.user);
    };

    return Title;
}