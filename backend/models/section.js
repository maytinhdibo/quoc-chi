module.exports = function (sequelize, Sequelize) { 
    const Section = sequelize.define("section", {
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
        description: {
            type: Sequelize.STRING,
        },
        chapterId: {
            field: 'chapter_id',
            type: Sequelize.STRING
        },
    });

    Section.associate = function (models) {
        Section.belongsToMany(models.user,{ through: models.sections_user });
        Section.belongsTo(models.chapter);
    };

    return Section;
}