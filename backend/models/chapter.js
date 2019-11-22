module.exports = function (sequelize, Sequelize) {
    const Chapter = sequelize.define("chapter", {
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
        volumeId: {
            field: 'volume_id',
            type: Sequelize.BIGINT,
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

    Chapter.associate = function (models) {
        Chapter.belongsTo(models.volume, { foreignKey: 'volumeId' });
        Chapter.hasMany(models.section);
    };

    return Chapter;
}