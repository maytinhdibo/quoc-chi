module.exports = function (sequelize, Sequelize) {
    //usercreate 
    const Title = sequelize.define("academic_title", {
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
          },
          updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
          },
        name: {
            type: Sequelize.STRING,
        },
        fullname: {
            type: Sequelize.STRING,
        },
    });

    Title.associate = function (models) {
        Title.hasMany(models.user, {foreignKey: 'academic_title_id'});
    };

    return Title;
}